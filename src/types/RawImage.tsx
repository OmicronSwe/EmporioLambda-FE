export default class RawImage {
  mime: string;

  imageCode: string;

  constructor(mime: string, imageCode: string) {
    this.mime = mime;
    this.imageCode = imageCode;
  }
}
