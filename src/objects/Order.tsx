import { ProductInCart } from "./ProductInCart";

export interface OrderJSON {
  id: string;
  products: ProductInCart[];
  totalCost: number;
  totalTax: number;
  date: Date;
}

export default class Order implements OrderJSON {
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
}
