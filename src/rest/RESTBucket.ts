export default class RESTBucket {
  additionalRoutes: string[] = [];
  bucket!: string;
  limit = 1; // Will be updated when headers are received
  readonly queue: ((cb: () => any) => any)[] = [];
  rateLimited = false;
  remaining = this.limit;
  resetAt = 0;
  route: string;
  running = false;
  constructor(route: string) {
    this.route = route;
  }

  add(fn: (cb: () => any) => any, priority = false) {
    priority ? this.queue.unshift(fn) : this.queue.push(fn);
    if (!this.running) this.run();
  }

  ratelimit() {
    const now = Date.now();
    if (now > this.resetAt) {
      this.remaining = this.limit;
    }
    if (this.remaining > 0) return Promise.resolve();

    this.rateLimited = true;
    return new Promise<void>((res) => setTimeout(() => {
      this.rateLimited = false;
      this.remaining = this.limit;
      res();
    }, Math.max(0, (this.resetAt || 0) - now)));
  }

  async run() {
    if (!this.queue.length) return;

    this.running = true;
    await this.ratelimit();

    this.remaining -= 1;

    this.queue.shift()!(() => {
      if (this.queue.length) this.run();
      else this.running = false;
    });
  }

  updateRatelimitInfo(header: any) {
    Object.keys(header).forEach((k) => (header[k] = isNaN(header[k]) ? header[k] : Number(header[k]))); // save convering each to number later
    if (header['x-ratelimit-limit'] && this.limit !== header['x-ratelimit-limit']) {
      this.limit = header['x-ratelimit-limit'];
      this.remaining = header['x-ratelimit-remaining'];
    }
    if (header['x-ratelimit-remaining'] !== undefined) {
      if (header['x-ratelimit-remaining'] < this.remaining) this.remaining = header['x-ratelimit-remaining'];
    } else {
      this.remaining = 1;
    }
    if (header['x-ratelimit-reset-after'] !== undefined) this.resetAt = (header['x-ratelimit-reset-after'] * 1000) + Date.now();
  }
}
