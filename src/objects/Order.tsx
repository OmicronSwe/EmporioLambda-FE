export default class Order {
  id: number;

  products: ProductInCart [];

  totalCost: number;

  totalTax: number;

  date: Date;

  public getId(): number {
    return this.id;
  }

  public getProducts(): ProductInCart[] {
    return this.products;
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
