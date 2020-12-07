import Collection from '../util/Collection';
import Requester from './Requester';
import RESTBucket from './RESTBucket';

export default class RateLimits extends Collection<RESTBucket> {
  requester: Requester
  constructor(requester: Requester) {
    super({ base: RESTBucket });
    this.requester = requester;
  }

  get(key: string) {
    return super.get(key) || this.find((b) => b.additionalRoutes.includes(key));
  }

  getBucket(bucket: string) {
    return this.find((i) => i.bucket === bucket);
  }

  getFromURL(url: string) {
    return this.get(url.replace(this.requester.routeRegex, this.requester.routeReplacer));
  }

  create(route: string) {
    this.set(route, new RESTBucket(route));
  }
}
