import {Category} from "./Category";

export default interface Product {
  name: string;

  description: string;

  image: string;

  price: string;

  categories: Category[]
}
