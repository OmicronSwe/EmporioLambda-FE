import StoredProduct from "./StoredProduct";

export default class ProductInCart {
  product: StoredProduct;

  quantity: number;

  constructor(product: StoredProduct, quantity: number) {
    this.product = product;
    this.quantity = quantity;
  }
}
