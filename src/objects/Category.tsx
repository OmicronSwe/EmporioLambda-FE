export default class Category {
  name: string;

  constructor(event) {
    this.name = event.target.name.value;
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
