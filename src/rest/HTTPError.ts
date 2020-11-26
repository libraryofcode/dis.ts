import { ClientRequest, IncomingMessage } from 'http';

export default class HTTPError extends Error {
  request: ClientRequest;
  response: IncomingMessage;
  payload: Record<string | number, unknown>;
  statusCode: number;
  readonly name = this.constructor.name;
  constructor(request: ClientRequest, response: IncomingMessage, payload: Record<string | number, unknown>, stack: string) {
    super(`${response.statusCode} - ${response.statusMessage}`);
    this.request = request;
    this.response = response;
    this.statusCode = response.statusCode!;
    this.payload = payload;
    this.stack = `${this.name}: ${this.message}\n${stack}`;
  }
}
