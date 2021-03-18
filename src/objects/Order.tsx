import ProductInCart from "./ProductInCart";

export default class Order {
  id: string;

  products: ProductInCart[];

  totalCost: number;

  totalTax: number;

  date: Date;

  constructor(
    id: string,
    products: ProductInCart[],
    totalCost: number,
    totalTax: number,
    date: Date
  ) {
    this.id = id;
    this.products = products;
    this.totalCost = totalCost;
    this.totalTax = totalTax;
    this.date = date;
  }

  public getId(): string {
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

  public static JSONtoOrder(json): Order {
    const products: ProductInCart[] = null;

    json.products.forEach((element) => {
      products.push(
        new ProductInCart(
          element.id,
          element.name,
          element.price,
          element.description,
          element.image,
          element.quantity
        )
      );
    });

    return new Order(json.id, products, json.totalCost, json.totalTax, json.date);
  }
}
