import { ClientRequest, OutgoingHttpHeaders, IncomingMessage, IncomingHttpHeaders } from 'http';
import RESTError from './RESTError';
import HTTPError from './HTTPError';

export default class HTTPResponse {
  data: Buffer;
  error: Error | null;
  headersIn: IncomingHttpHeaders;
  headersOut: OutgoingHttpHeaders;
  request: ClientRequest;
  response: IncomingMessage;
  constructor(request: ClientRequest, response: IncomingMessage, data: Buffer, stack: string) {
    this.request = request;
    this.headersOut = request.getHeaders();
    this.response = response;
    this.headersIn = response.headers;
    this.data = data;
    if (this.response.statusCode! >= 300) {
      if (this.json?.code) {
        this.error = new RESTError(this.request, this.response, this.json, stack, this);
      } else {
        this.error = new HTTPError(this.request, this.response, this.json, stack, this);
      }
    } else {
      this.error = null;
    }
  }

  get json() {
    if (this.headersIn['content-type'] !== 'application/json') return null;
    return this.rawData.length ? JSON.parse(this.rawData) : undefined;
  }

  get rawData() {
    return this.data.toString();
  }
}
