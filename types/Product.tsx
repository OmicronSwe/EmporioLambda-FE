export default abstract class Product{
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;

  constructor(
    id :string,
    name: string,
    description: string,
    price: number,
    category: string
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.category = category;
  }
}
