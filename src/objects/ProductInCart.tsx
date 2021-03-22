class ProductInCart{
    id: string
    name : string
    price : number
    description : string
    image : string
    quantity : number

    constructor(id, name, price, description, image, quantity)
    {
        this.id = id
        this.name = name
        this.price = price
        this.description = description
        this.image = image
        this.quantity = quantity
    }

    public static toStringForLocalStorage(cartArray : ProductInCart[]){
        let i = 0
        let ids = "["
        while(i<cartArray.length)
        {
          ids=ids+'{ "id" : "' + cartArray[i].id + '", "quantity" : "' + cartArray[i].quantity + '" },'
          i++
        }
        ids = ids.slice(0, -1)
        ids=ids+"]"
        return ids;
    }
}

export default ProductInCart