export interface ProductImageJSON {
    mime: string;
    imageCode: string;
}

export class ProductImage implements ProductImageJSON {
    mime: string;

    imageCode: string;

    constructor(
        mime: string,
        imageCode: string
    ) {
        this.mime = mime;
        this.imageCode = imageCode;
    }
}