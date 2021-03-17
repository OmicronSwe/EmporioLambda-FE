export default class Order {
  id: number;

  products: string[];

  quantity: string[];

  totalCost: number;

  totalTax: number;

  date: Date;

  public getId(): number {
    return this.id;
  }

  public getProducts(): string[] {
    return this.products;
  }

  public getQuantity(): string[] {
    return this.quantity;
  }

  public getTotalCost(): number {
    return this.totalCost;
  }

  public getTotalTax(): number {
    return this.totalTax;
  }

  public getDate(): Date {
    return this.date;
  }
}
