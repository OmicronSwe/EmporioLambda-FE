import Product from "./Product";

export default class StoredProduct extends Product {
  imageUrl: string;

  id: string;

  constructor(
    id: string,
    name: string,
    description: string,
    imageUrl: string,
    price: number,
    category: string
  ) {
    super(name, description, price, category);
    this.id = id;
    this.imageUrl = imageUrl;
  }
}
