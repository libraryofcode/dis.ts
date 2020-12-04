export default class Collection<T> extends Map<string, T> {
  Base: new (...args: any[]) => T;
  maxContent?: number;
  constructor(options: {
    base: new (...args: any[]) => T;
    entries?: readonly (readonly [string, T])[];
    maxContent?: number;
  }) {
    super(options?.entries);
    this.Base = options.base;
    this.maxContent = options?.maxContent;
  }

  upsert(name: string, obj: T | Record<string, unknown>, overwrite = false) {
    if ((obj instanceof this.Base!) === false) obj = new this.Base(obj);
    if (overwrite === false && this.has(name)) return this.get(name);

    // @ts-expect-error
    this.set(name, obj);

    if (this.maxContent !== undefined && this.size > this.maxContent) {
      const names = this.keys();
      while (this.size > this.maxContent) {
        this.delete(names.next().value);
      }
    }

    return obj;
  }

  find(func: (item?: T, index?: number, obj?: T[]) => boolean): T | null {
    return this.asArray().find(func) || null;
  }

  asArray() {
    return [...this.values()];
  }

  asEntries() {
    return [...this.entries()];
  }

  rand() {
    return this.asArray()[Math.floor(Math.random() * this.size)];
  }

  filter(func: (value?: T, index?: number, array?: T[]) => unknown): T[] {
    return this.asArray().filter(func);
  }

  map<R>(func: (value?: T, index?: number, array?: T[]) => R): R[] {
    return this.asArray().map(func);
  }

  every<S>(func: (value?: T, index?: number, array?: T[]) => this is S) {
    return this.asArray().every(func);
  }

  some<S>(func: (value?: T, index?: number, array?: T[]) => this is S) {
    return this.asArray().some(func);
  }

  remove(key: string | ((value?: T, index?: number, array?: T[]) => unknown)): T | null {
    if (typeof key === 'string') {
      const item = this.get(key);
      if (!item) return null;
      this.delete(key);
      return item;
    }

    const found = this.asEntries().find(([, v]) => key(v));
    if (!found) return null;
    this.delete(found[0]);
    return found[1];
  }
}
