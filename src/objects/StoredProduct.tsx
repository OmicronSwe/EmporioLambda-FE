import Product from "./Product";

export default class StoredProduct implements Product {
  id: string;

  name: string;

  description: string;

  imageUrl: string;

  price: string;

  category: string;

  constructor(
    id: string,
    name: string,
    description: string,
    imageUrl: string,
    price: string,
    category: string
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.imageUrl = imageUrl;
    this.price = price;
    this.category = category;
  }
}
