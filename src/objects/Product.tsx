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