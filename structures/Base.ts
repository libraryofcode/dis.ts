export default abstract class Base {
  public id: string;

  constructor(id: string) {
    this.id = id;
  }

  toString() {
    return `[${this.constructor.name}${this.id ? ` ${this.id}` : ''}]`;
  }
}
