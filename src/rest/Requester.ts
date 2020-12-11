import http from 'http';
import HTTPS, { HTTP_METHODS } from './HTTPS';
import RateLimits from './RateLimits';
import RESTBucket from './RESTBucket';

const { version, repository } = require('../../package.json');

export default class Requester {
  version = 'v8';
  apiURL = `/api/${this.version}`;
  https = new HTTPS(null, this);
  userAgent = `DiscordBot (${repository}, ${version})`;
  globallyRateLimited = false;
  readonly rateLimits = new RateLimits(this);
  readonly routeRegex = /\/(?!guilds|channels|webhooks)([a-z-]+)\/(?:\d+)/g;
  readonly routeReplacer = '/$1/:id';
  readonly webhookRegex = /\/webhooks\/(\d+)\/[a-zA-Z0-9-_]{64,}/
  readonly webhookReplacer = '/webhooks/$1/:token';
  readonly messageIDRegex = /\/channels\/\d+\/messages\//;
  readonly DISCORD_EPOCH = 1420070400000;
  readonly INVALID_HEADER_REGEX = /[^\t\x20-\x7e\x80-\xff]/;

  async request(method: HTTP_METHODS, endpoint: string, auth: boolean, payload?: { [s: string]: any }): Promise<any> {
    if (this.globallyRateLimited) throw new Error('Globally rate limited. Try again later.'); // TODO Implement proper global rate limit queue

    const rateLimitRoute = this.calculateRLRoute(endpoint, method);
    const routeBucket = this.rateLimits.get(rateLimitRoute) || this.rateLimits.create(rateLimitRoute);

    const headers: http.OutgoingHttpHeaders = {
      'User-Agent': this.userAgent,
    };
    if (auth) headers.Authorization = 'Bot $token';
    if (payload?.reason) {
      payload.reason = payload.reason.replace(/\s+/g, ' ');
      if (this.INVALID_HEADER_REGEX.test(payload.reason)) throw new TypeError('Invalid character(s) in Audit Log reason');
      headers['X-Audit-Log-Reason'] = payload.reason;
      if ((method !== 'POST' || !endpoint.includes('/prune')) && (method !== 'PUT' || endpoint.includes('/bans'))) delete payload.reason;
    }

    let endpointFinal = this.apiURL + endpoint;

    let data: string | undefined;
    if (payload) {
      if (method === 'GET' || method === 'DELETE') {
        const queryString: string[] = [];
        Object.entries(payload).forEach(([key, value]) => {
          if (value === undefined) return;
          if (Array.isArray(value)) {
            value.forEach((v) => queryString.push(`${encodeURIComponent(key)}=${encodeURIComponent(v)}`));
          } else {
            queryString.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
          }
        });
        endpointFinal += `?${queryString.join('&')}`;
      } else {
        data = JSON.stringify(payload);
      }
    }

    return new Promise((res, rej) => { // This seems to be the best way to return data asap then handle rate limits?
      routeBucket.add(async (cb) => {
        const api = await this.https.request(method, endpointFinal, headers, data);
        if (api.error) rej(api.error);
        else res(api.json);
        cb();

        const discordBucket = api.headersIn['x-ratelimit-bucket'] as string | undefined;
        if (api.headersIn['x-ratelimit-global'] === 'true') {
          this.globallyRateLimited = true;
          setTimeout(() => { this.globallyRateLimited = false; }, api.json.retry_after * 1e3);
        } else if (discordBucket !== undefined) {
          const bucket = this.rateLimits.getBucket(discordBucket) || this.rateLimits.get(rateLimitRoute) as RESTBucket;
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
      });
    });
  }

  calculateRLRoute(endpoint: string, method: HTTP_METHODS) {
    const route = endpoint
      .replace(this.routeRegex, this.routeReplacer)
      .replace(this.webhookRegex, this.webhookReplacer);

    if (method === 'DELETE' && route.endsWith('/messages/:id')) {
      // NOTE Deleting messages has its own rate limit
      // Messages younger than 10 seconds have no rate limit
      // Messages younger than 2 weeks have a rate limit of 3 per 1 second
      // All other messages have a rate limit of 30 per 120 seconds
      const diff = Date.now() - Math.floor(Number(endpoint.replace(this.messageIDRegex, '')) / 4194304) + this.DISCORD_EPOCH;
      if (diff < 10e3) return `DELETE_NEW-${route}`;
      if (diff < 1209600e3) return `DELETE-${route}`;
      return `DELETE_OLD-${route}`;
    }
    return route;
  }
}
