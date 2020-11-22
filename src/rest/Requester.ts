import HTTPS from 'https';

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
  }
}
