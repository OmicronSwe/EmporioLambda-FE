export default class Product {
  name: string;

  description: string;

  image: string;

  price: string;

  public getName(): string {
    return this.name;
  }

  public getDescription(): string {
    return this.description;
  }

  public getImage(): string {
    return this.image;
  }

  public getPrice(): string {
    return this.price;
  }
}
