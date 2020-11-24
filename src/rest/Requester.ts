import http from 'http';
import HTTPS, { HTTP_METHODS } from './HTTPS';
import APIError from './APIError';

const { version, repository } = require('../../package.json');

export default class Requester {
  version = 'v8';
  apiURL= `/api/${this.version}`;
  https = new HTTPS(null, this);
  userAgent = `DiscordBot (${repository}, ${version})`;

  async request(method: HTTP_METHODS, endpoint: string, auth: boolean, payload?: { [s: string]: any }): Promise<any> {
    const headers: http.OutgoingHttpHeaders = {
      'User-Agent': this.userAgent,
    };
    if (auth) headers.Authorization = 'Bot $token';
    if (payload.reason) {
      headers['X-Audit-Log-Reason'] = payload.reason;
      if ((method !== 'POST' || !endpoint.includes('/prune')) && (method !== 'PUT' || endpoint.includes('/bans'))) delete payload.reason;
    }

    let endpointFinal = endpoint;

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

    const api = await this.https.request(method, endpointFinal, headers, data);
    /*
    return new Promise((res, rej) => {
      const headers = {
        Authorization: 'Bot $token',
        'User-Agent': 'Discord.TS ($url, $version)',
        'X-RateLimit-Precision': 'millisecond',
      };
      if (payload !== undefined && payload.reason !== undefined) {
        headers['X-Audit-Log-Reason'] = payload.reason;
        delete payload.reason;
      }

      const request = HTTPS.request(new URL(endpoint, this.baseURL), {
        method,
        headers,
      });

      request.once('response', (response) => {
        let data = '';

        response
          .on('data', (d) => { data += d; })
          .once('end', () => {
            let parsed = data.length !== 0 && response.headers['content-type'] === 'application/json' ? JSON.parse(data) : data;
            typeof parsed === 'string' ? parsed += `statusCode:${response.statusCode}` : parsed.statusCode = response.statusCode;
            res(data);
          });
      });
    });
    */
  }
}
