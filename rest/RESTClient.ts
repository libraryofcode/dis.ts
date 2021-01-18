import http from 'http';
import Client from '../src/Client';
import DiscordHTTPS, { HTTP_METHODS } from './HTTPRequest';
import RateLimits from './RateLimits';
import RESTBucket from './RESTBucket';
import { REST_CONSTANTS } from '../src/util/Constants';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { version, repository } = require('../../package.json');

export default class RESTClient {
  version = 'v8';

  apiURL = `/api/${this.version}`;// eslint-disable-line @typescript-eslint/member-ordering

  readonly client: Client;

  globallyRateLimited = false;

  https = new DiscordHTTPS(null, this);

  queue: (() => void)[] = [];

  readonly rateLimits = new RateLimits(this);

  userAgent = `DiscordBot (${repository}, ${version})`;

  constructor(client: Client) {
    this.client = client;
  }

  request(method: HTTP_METHODS, endpoint: string, auth: boolean, payload?: { [s: string]: any }): Promise<any> {
    const rateLimitRoute = this.calculateRLRoute(endpoint, method);
    const routeBucket = this.rateLimits.get(rateLimitRoute) || this.rateLimits.create(rateLimitRoute);

    const headers: http.OutgoingHttpHeaders = { 'User-Agent': this.userAgent };
    if (auth) headers.Authorization = this.client.token;
    if (payload?.reason) {
      payload.reason = payload.reason.replace(/\s+/g, ' ');
      if (REST_CONSTANTS.INVALID_HEADER_REGEX.test(payload.reason)) throw new TypeError('Invalid character(s) in Audit Log reason');
      headers['X-Audit-Log-Reason'] = payload.reason;
      if ((method !== 'POST' || !endpoint.includes('/prune')) && (method !== 'PUT' || endpoint.includes('/bans'))) delete payload.reason;
    }

    let endpointFinal = this.apiURL + endpoint;

    let data: string | undefined;
    if (payload) {
      if (method === 'GET' || method === 'DELETE') {
        const queryString: string[] = [];
        Object.entries(payload).forEach(([ key, value ]) => {
          // eslint-disable-next-line no-undefined
          if (value === undefined) return;
          if (Array.isArray(value)) value.forEach((v) => queryString.push(`${encodeURIComponent(key)}=${encodeURIComponent(v)}`));
          else queryString.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
        });
        endpointFinal += `?${queryString.join('&')}`;
      } else {
        data = JSON.stringify(payload);
      }
    }

    const request = new Promise((res, rej) => { // This seems to be the best way to return data asap then handle rate limits?
      const call = async (cb: any) => {
        const api = await this.https.request(method, endpointFinal, headers, data);
        if (api.error) rej(api.error);
        else res(api.json);
        cb();

        const discordBucket = api.headersIn['x-ratelimit-bucket'] as string | undefined;
        if (api.headersIn['x-ratelimit-global'] === 'true') {
          this.globallyRateLimited = true;

          setTimeout(() => {
            this.globallyRateLimited = false;

            while (this.queue.length >= 1) {
              const _request = this.queue.shift();

              // @ts-ignore ts(2722) "Cannot invoke an object which is possibly 'undefined'."
              _request();
            }
          }, api.json.retry_after * 1e3);
          // eslint-disable-next-line no-undefined
        } else if (discordBucket !== undefined) {
          const bucket = this.rateLimits.getBucket(discordBucket) || this.rateLimits.get(rateLimitRoute) as RESTBucket;
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          bucket.bucket ?? (bucket.bucket = discordBucket);

          if (rateLimitRoute !== bucket.route && !bucket.additionalRoutes.includes(rateLimitRoute)) {
            bucket.additionalRoutes.push(rateLimitRoute);
            bucket.remaining -= 1;
            if (!rateLimitRoute.startsWith('DELETE')) this.rateLimits.delete(rateLimitRoute); // Don't accidentally get rid of message delete rate limits
          }

          bucket.updateRatelimitInfo(api.headersIn);
        } else {
          routeBucket.remaining += 1;
        }
      };

      if (this.globallyRateLimited) this.queue.push(() => routeBucket.add(call));
      else routeBucket.add(call);
    });

    return request;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  calculateRLRoute(endpoint: string, method: HTTP_METHODS) {
    const route = endpoint
      .replace(REST_CONSTANTS.ROUTE_REGEX, REST_CONSTANTS.ROUTE_REPLACER)
      .replace(REST_CONSTANTS.WEBHOOK_REGEX, REST_CONSTANTS.WEBHOOK_REPLACER);

    if (method === 'DELETE' && route.endsWith('/messages/:id')) {
      // NOTE Deleting messages has its own rate limit
      // Messages younger than 10 seconds have no rate limit
      // Messages younger than 2 weeks have a rate limit of 3 per 1 second
      // All other messages have a rate limit of 30 per 120 seconds
      const diff = Date.now() - Math.floor(Number(endpoint.replace(REST_CONSTANTS.MESSAGE_ID_REGEX, '')) / 4194304) + REST_CONSTANTS.DISCORD_EPOCH;
      if (diff < 10e3) return `DELETE_NEW-${route}`;
      if (diff < 1209600e3) return `DELETE-${route}`;
      return `DELETE_OLD-${route}`;
    }
    return route;
  }
}
