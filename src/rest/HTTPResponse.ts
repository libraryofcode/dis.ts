import { ClientRequest, OutgoingHttpHeaders, IncomingMessage, IncomingHttpHeaders } from 'http';
import APIError from './APIError';
import HTTPError from './HTTPError';

export default class HTTPResponse {
  request: ClientRequest;
  headersOut: OutgoingHttpHeaders;
  headersIn: IncomingHttpHeaders;
  response: IncomingMessage;
  error: Error | null;
  data: Buffer;
  constructor(request: ClientRequest, response: IncomingMessage, data: Buffer, stack: string) {
    this.request = request;
    this.headersOut = request.getHeaders();
    this.response = response;
    this.headersIn = response.headers;
    this.data = data;
    if (this.response.statusCode! >= 300) {
      if (this.json?.code) {
        this.error = new APIError(this.request, this.response, this.json, stack, this);
      } else {
        this.error = new HTTPError(this.request, this.response, this.json, stack, this);
      }
    } else {
      this.error = null;
    }
  }

  get json() {
    if (this.headersIn['content-type'] !== 'application/json') return null;
    return JSON.parse(this.data.toString());
  }

  get rawData() {
    return this.data.toString();
  }
}
