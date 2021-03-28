import { Category } from "./Category";

export interface ProductJSON {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: string;
  categories: Category[];
}

export class Product implements ProductJSON {
  id: string;

  name: string;

  description: string;

  imageUrl: string;

  price: string;

  categories: Category[];

  constructor(
    id: string,
    name: string,
    description: string,
    imageUrl: string,
    price: string,
    categories: Category[]
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.imageUrl = imageUrl;
    this.price = price;
    this.categories = categories;
  }
}
