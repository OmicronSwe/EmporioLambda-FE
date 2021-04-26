import Product from "./Product";

export default class StoredProduct extends Product {
  imageUrl: string;

  constructor(
    id: string,
    name: string,
    description: string,
    imageUrl: string,
    price: number,
    category: string
  ) {
    super(id,name,description,price,category)
    this.imageUrl = imageUrl;
  }
}
