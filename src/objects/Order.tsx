import ProductInCart from "./ProductInCart";

export interface OrderJSON {
  id: string;
  username: string;
  products: ProductInCart[];
  totalPrice: number;
  taxesApplied: number;
  date: Date;
  email: string;
}

export class Order implements OrderJSON {
  id: string;

  username: string;

  products: ProductInCart[];

  totalPrice: number;

  taxesApplied: number;

  date: Date;

  email: string;

  constructor(
    id: string,
    username: string,
    products: ProductInCart[],
    totalPrice: number,
    taxesApplied: number,
    date: Date,
    email: string
  ) {
    this.id = id;
    this.username = username;
    this.products = products;
    this.totalPrice = totalPrice;
    this.taxesApplied = taxesApplied;
    this.date = date;
    this.email = email;
  }
}
