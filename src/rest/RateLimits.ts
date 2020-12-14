import Collection from '../util/Collection';
import RESTClient from './RESTClient';
import RESTBucket from './RESTBucket';

export default class RateLimits extends Collection<RESTBucket> {
  requester: RESTClient
  constructor(requester: RESTClient) {
    super({ base: RESTBucket });
    this.requester = requester;
  }

  get(key: string) {
    return super.get(key) || this.find((b) => b.additionalRoutes.includes(key));
  }

  has(key: string) {
    return super.has(key) || this.some((b) => b.additionalRoutes.includes(key));
  }

  getBucket(bucket: string) {
    return this.find((i) => i.bucket === bucket);
  }

  getFromURL(url: string) {
    return this.get(url.replace(this.requester.routeRegex, this.requester.routeReplacer));
  }

  create(route: string) {
    return this.set(route, new RESTBucket(route)).get(route) as RESTBucket;
  }
}
