import { Category } from "./Category";
import { ProductImage } from "./ProductImage";

export interface ProductJSON {
  id: string;
  name: string;
  description: string;
  image: ProductImage;
  price: string;
  category: Category;
}

export class Product implements ProductJSON {
  id: string;

  name: string;

  description: string;

  image: ProductImage;

  price: string;

  category: Category;

  constructor(
    id: string,
    name: string,
    description: string,
    image: ProductImage,
    price: string,
    category: Category
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.image = image;
    this.price = price;
    this.category = category;
  }
}
