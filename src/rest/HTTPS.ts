import http from 'http';
import https from 'https';
import APIError, { ErrorPayload } from './APIError';
import HTTPError from './HTTPError';
import Requester from './Requester';

export type HTTP_METHODS = 'DELETE' | 'GET' | 'PATCH' | 'POST' | 'PUT';

export default class HTTPS {
  private _client: unknown;
  domain = 'discord.com';
  requester: Requester;
  constructor(client: unknown, requester: Requester) {
    this._client = client;
    this.requester = requester;
  }

  request(method: HTTP_METHODS, path: string, headers: http.OutgoingHttpHeaders, body?: string | string[]) {
    return new Promise((res, rej) => {
      // @ts-expect-error
      const stackTrace: {stack: string} = {}; Error.captureStackTrace(stackTrace); stackTrace.stack = stackTrace.stack.substr(6);

      const request = https.request({
        method,
        host: this.domain,
        path,
        headers,
      });

      let error: Error;

      request
        .once('error', (err) => {
          error = err;
          request.abort();
        })
        .once('abort', () => {
          error = error || new Error('Client aborted request');
          rej(error);
        })
        .once('response', (response) => {
          const _data: Buffer[] = [];

          response
            .on('data', (b) => _data.push(b))
            .on('error', (err) => {
              error = err;
              request.abort();
            })
            .once('end', () => {
              const text = Buffer.concat(_data).toString();
              let json: Record<string | number, unknown> | ErrorPayload | undefined;

              if (response.headers['content-type'] !== 'application/json') rej(new Error(`Unexpected header ${response.headers['content-type']}`));
              if (text.length > 0) json = JSON.parse(text);

              if (response.statusCode! >= 300) {
                if (json && json.code) {
                  rej(new APIError(request, response, json as ErrorPayload, stackTrace.stack));
                } else if (json) {
                  rej(new HTTPError(request, response, json as Record<string | number, unknown>, stackTrace.stack));
                } else {
                  rej(new Error(`${response.statusCode} - ${text}`));
                }
              } else {
                res(json);
              }
            });
        });

      request.setTimeout(30000, () => {
        error = new Error('Request timed out');
        request.abort();
      });

      if (Array.isArray(body)) {
        body.forEach((b) => request.write(b));
      } else if (body) {
        request.write(body);
      }
      request.end();
    });
  }
}
