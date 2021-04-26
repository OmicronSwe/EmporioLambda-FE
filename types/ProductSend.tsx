import Product from "./Product";
import RawImage from "./RawImage";

export default class ProductSend extends Product {
  imageFile: RawImage;

  constructor(
    id:string,
    name: string,
    description: string,
    imageFile: RawImage,
    price: number,
    category: string
  ) {
    super(id,name,description,price,category)
    this.imageFile = imageFile;
  }
}
