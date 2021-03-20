import { Category } from "./Category";

export interface ProductJSON {
  id: string;
  name: string;
  description: string;
  image: string;
  price: string;
  categories: Category[];
}

export class Product implements ProductJSON {
  id: string;

  name: string;

  description: string;

  image: string;

  price: string;

  categories: Category[];

  constructor(
    id: string,
    name: string,
    description: string,
    image: string,
    price: string,
    categories: Category[]
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.image = image;
    this.price = price;
    this.categories = categories;
  }
}
