import Product from "./Product";
import ProductImage from "./ProductImage";

export default class JustCreatedProduct implements Product {
  name: string;

  description: string;

  imageFile: ProductImage;

  price: number;

  category: string;

  constructor(
    name: string,
    description: string,
    imageFile: ProductImage,
    price: number,
    category: string
  ) {
    this.name = name;
    this.description = description;
    this.imageFile = imageFile;
    this.price = price;
    this.category = category;
  }
}
