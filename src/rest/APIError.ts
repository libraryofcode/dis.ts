import { ClientRequest, IncomingMessage } from 'http';
import HTTPResponse from './HTTPResponse';

export interface ErrorPayload {
  code: number;
  message: string;
  errors: Record<string | number, unknown>;
}

export default class APIError extends Error {
  payload: ErrorPayload;
  statusCode: number;
  code: number;
  request: ClientRequest;
  response: IncomingMessage;
  meta: HTTPResponse;
  readonly name = this.constructor.name;
  constructor(request: ClientRequest, response: IncomingMessage, payload: ErrorPayload, stack: string, meta: HTTPResponse) {
    super(`[${payload.code}] - ${payload.message}`);
    this.statusCode = response.statusCode!;
    this.payload = payload;
    this.code = payload.code;
    this.stack = `${this.name}: ${this.message}\n${stack}`;
    this.request = request;
    this.response = response;
    this.meta = meta;
  }
}
