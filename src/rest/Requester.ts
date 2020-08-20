import fetch from 'node-fetch';

type REST_METHODS = 'DELETE' | 'GET' | 'PATCH' | 'POST' | 'PUT';

class Requester {
  apiURL: string = 'https://discord.com/api';
  version: string = 'v6'; // Make this interchangable
  baseURL: string = `${this.apiURL}/${this.version}`;

  request(method: REST_METHODS, endpoint: string, auth: boolean, payload: { [s: string]: any }): Promise<any> {
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

      const request = fetch(this.baseURL + endpoint, {
        method,
        headers,
        body: JSON.stringify(payload),
        compress: true,
      }).then((r) => {
        if (r.ok === false) { (() => {})(); } // Do something on error
      });
    });
  }
}
