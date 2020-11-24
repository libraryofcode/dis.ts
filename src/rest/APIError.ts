import { ClientRequest, IncomingMessage } from 'http';

export interface ErrorPayload {
  code: number;
  message: string;
  errors: Record<string | number, unknown>;
}

export default class APIError extends Error {
  payload: ErrorPayload;
  statusCode: number;
  code: number;
  constructor(request: ClientRequest, response: IncomingMessage, payload: ErrorPayload, stack: string) {
    super(`[${payload.code}] - ${payload.message}`);
    this.statusCode = response.statusCode;
    this.payload = payload;
    this.code = payload.code;
    this.stack = `${this.name}: ${this.message}\n${stack}`;
  }
}
