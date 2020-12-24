import Collection from '../util/Collection';
import RESTClient from './RESTClient';
import RESTBucket from './RESTBucket';
import { REST_CONSTANTS } from '../util/Constants';

export default class RateLimits extends Collection<RESTBucket> {
  requester: RESTClient;
  constructor(requester: RESTClient) {
    super({ base: RESTBucket });
    this.requester = requester;
  }

  create(route: string) {
    return this.set(route, new RESTBucket(route)).get(route) as RESTBucket;
  }

  get(key: string) {
    return super.get(key) || this.find((b) => b.additionalRoutes.includes(key));
  }

  getBucket(bucket: string) {
    return this.find((i) => i.bucket === bucket);
  }

  getFromURL(url: string) {
    return this.get(url.replace(REST_CONSTANTS.ROUTE_REGEX, REST_CONSTANTS.ROUTE_REPLACER));
  }

  has(key: string) {
    return super.has(key) || this.some((b) => b.additionalRoutes.includes(key));
  }
}
