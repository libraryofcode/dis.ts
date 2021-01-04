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

  asArray() {
    return [ ...this.values() ];
  }

  asEntries() {
    return [ ...this.entries() ];
  }

  every<S>(func: (value: T, index: number, array: T[]) => this is S) {
    return this.asArray().every(func);
  }

  filter(func: (value: T, index: number, array: T[]) => unknown): T[] {
    return this.asArray().filter(func);
  }

  find(func: (item: T, index: number, obj: T[]) => boolean) {
    return this.asArray().find(func);
  }

  map<R>(func: (value: T, index: number, array: T[]) => R): R[] {
    return this.asArray().map(func);
  }

  rand() {
    return this.asArray()[Math.floor(Math.random() * this.size)];
  }

  remove(key: string | ((value: T, index: number, array: T[]) => unknown)): T | null {
    if (typeof key === 'string') {
      const item = this.get(key);
      if (!item) return null;
      this.delete(key);
      return item;
    }

    const found = this.asEntries().find(([ , v ], i, obj) => key(v, i, obj.map((o) => o[1])));
    if (!found) return null;
    this.delete(found[0]);
    return found[1];
  }

  some<S>(func: (value: T, index: number, array: T[]) => this is S) {
    return this.asArray().some(func);
  }

  upsert(name: string, obj: T | Record<string, unknown>, overwrite = false) {
    if ((obj instanceof this.Base!) === false) obj = new this.Base(obj);
    if (overwrite === false && this.has(name)) return this.get(name);

    this.set(name, obj as T);

    if (this.maxContent !== undefined && this.size > this.maxContent) {
      const names = this.keys();
      while (this.size > this.maxContent) this.delete(names.next().value);
    }

    return obj;
  }
}
