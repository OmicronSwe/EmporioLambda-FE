export interface ProductInCartJSON{
  id: string;

  name: string;

  price: number;

  description: string;

  image: string;

  quantity: number;
}

export class ProductInCart implements ProductInCartJSON {
  id: string;

  name: string;

  price: number;

  description: string;

  image: string;

  quantity: number;

  constructor(id, name, price, description, image, quantity) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.description = description;
    this.image = image;
    this.quantity = quantity;
  }
}