import ProductImage from "./ProductImage";

export default interface Product {
  id?: string;
  name: string;
  description: string;
  imageFile?: ProductImage;
  imageUrl?: string;
  price: string;
  category?: string;
}

export class Product implements ProductJSON {
  id: string;

  name: string;

  description: string;

  image: string;

  price: string;

  category?: string;

  constructor(
    id: string,
    name: string,
    description: string,
    image: string,
    price: string,
    category?: string
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.image = image;
    this.price = price;
    this.category = category;
  }
}
