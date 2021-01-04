import { ClientRequest, IncomingMessage } from 'http';
import HTTPResponse from './HTTPResponse';

export interface ErrorPayload {
  code: number;
  errors: Record<string | number, unknown>;
  message: string;
}

export default class RESTError extends Error {
  code!: number;
  meta!: HTTPResponse;
  readonly name = this.constructor.name;
  payload!: ErrorPayload;
  request!: ClientRequest;
  response!: IncomingMessage;
  statusCode!: number;
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
