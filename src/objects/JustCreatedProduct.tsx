import Product from "./Product";
import ProductImage from "./ProductImage";

export default class JustCreatedProduct implements Product {

    name: string;
  
    description: string;
  
    imageFile: ProductImage;
  
    price: string;
  
    category: string;
  
    constructor(
      name: string,
      description: string,
      imageFile: ProductImage,
      price: string,
      category: string
    ) {
      this.name = name;
      this.description = description;
      this.imageFile = imageFile;
      this.price = price;
      this.category = category;
    }
  }