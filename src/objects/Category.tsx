export default class Category {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  public getName(): string {
    return this.name;
  }

  public toJSONstring(): string {
    return JSON.stringify({
      name: this.name,
    });
  }
}
