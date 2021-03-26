import { ProductInCart } from "./ProductInCart";

export interface OrderJSON {
  id: string;
  username: string;
  products: ProductInCart[];
  totalCost: number;
  totalTax: number;
  date: Date;
  email: string;
}

export class Order implements OrderJSON {
  id: string;

  username: string;

  products: ProductInCart[];

  totalCost: number;

  totalTax: number;

  date: Date;

  email: string;

  constructor(
    id: string,
    username: string,
    products: ProductInCart[],
    totalCost: number,
    totalTax: number,
    date: Date,
    email: string
  ) {
    this.id = id;
    this.username = username;
    this.products = products;
    this.totalCost = totalCost;
    this.totalTax = totalTax;
    this.date = date;
    this.email = email;
  }
}