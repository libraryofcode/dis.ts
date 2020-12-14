import { ClientRequest, IncomingMessage } from 'http';
import HTTPResponse from './HTTPResponse';

export interface ErrorPayload {
  code: number;
  message: string;
  errors: Record<string | number, unknown>;
}

export default class RESTError extends Error {
  request!: ClientRequest;
  response!: IncomingMessage;
  statusCode!: number;
  code!: number;
  payload!: ErrorPayload;
  meta!: HTTPResponse;
  readonly name = this.constructor.name;
  constructor(request: ClientRequest, response: IncomingMessage, payload: ErrorPayload, stack: string, meta: HTTPResponse) {
    super(`[${payload.code}] - ${payload.message}`);
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
    Object.defineProperty(this, 'code', {
      enumerable: false,
      value: payload.code,
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
