import http from 'http';
import https from 'https';
import HTTPResponse from './HTTPResponse';
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
    return new Promise<HTTPResponse>((res, rej) => {
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
            .once('end', () => res(new HTTPResponse(request, response, Buffer.concat(_data), stackTrace.stack)));
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
