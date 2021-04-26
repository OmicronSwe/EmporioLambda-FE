import ProductInCart from "./ProductInCart";

export default class Cart {
    products: ProductInCart[];

    constructor(products: ProductInCart[]) {
        this.products = products
    }

    public toStringForLocalStorage(): string {
        let ids: string = '{"items":[';
        let containElements: boolean = false;
        this.products.forEach((element) => {
          ids = `${ids}{ "id" : "${element.product.id}", "quantity" : "${element.quantity}" },`;
          containElements = true;
        });
        if (containElements) ids = ids.slice(0, -1);
        ids += "]}";
        return ids;
    }

    public getProductsSum(): number {
        let sum = 0;
        this.products.forEach((element) => {
          sum += element.product.price * element.quantity;
        });
        return sum;
    }

}