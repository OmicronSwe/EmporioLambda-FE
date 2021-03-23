class ProductInCart {
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

  public static toStringForLocalStorage(cartArray: ProductInCart[]) : string {
    
    let ids : string = "[";
    let containElements : boolean = false;
    cartArray.forEach((element)=>{
      ids = `${ids}{ "id" : "${element.id}", "quantity" : "${element.quantity}" },`;
      containElements = true;
    })
    if(containElements) ids = ids.slice(0, -1);
    ids += "]";
    return ids;
  }
  
  public static getProductsSum(cartArray: ProductInCart[]) : number {
    let sum = 0;
    cartArray.forEach((element) =>{
      sum = sum + element.price*element.quantity;
    })
    return sum;
  }
}

export default ProductInCart;
