import { ClientRequest, IncomingMessage } from 'http';
import HTTPResponse from './HTTPResponse';

export default class HTTPError extends Error {
  meta!: HTTPResponse;
  readonly name = this.constructor.name;
  payload!: Record<string | number, unknown>;
  request!: ClientRequest;
  response!: IncomingMessage;
  statusCode!: number;
  constructor(request: ClientRequest, response: IncomingMessage, payload: Record<string | number, unknown>, stack: string, meta: HTTPResponse) {
    super(`${response.statusCode} - ${response.statusMessage}`);
    Object.defineProperty(this, 'request', {
      enumerable: false,
      value: request,
    });
    Object.defineProperty(this, 'response', {
      enumerable: false,
      value: response,
    });
    Object.defineProperty(this, 'statusCode', {
      enumerable: false,
      value: response.statusCode,
    });
    Object.defineProperty(this, 'payload', {
      enumerable: false,
      value: payload,
    });
    Object.defineProperty(this, 'meta', {
      enumerable: false,
      value: meta,
    });
    this.stack = `${this.name}: ${this.message}\n${stack}`;
  }
}
