export interface ProductImageJSON {
  mime: string;
  imageCode: string;
}

export default class ProductImage implements ProductImageJSON {
  mime: string;

  imageCode: string;

  constructor(mime: string, imageCode: string) {
    this.mime = mime;
    this.imageCode = imageCode;
  }
}
