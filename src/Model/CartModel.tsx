import React from 'react'
import Product from "../../components/Cart/product"

class CartModel extends React.Component<{ response; auth }, { items: string }> {
    products : Product[] = []
    cost : number

    constructor(props){
        super(props)
        if(!this.props.auth)
        { 
            this.products = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []
        }else
        {
            this.props.response.products_id != null ? this.props.response.products_id : []
        }
        this.products.forEach(product => {
          this.cost += product.price*product.quantity
        }
        )
    }

/*    addProductToCart(product : Product) {
      if(this.props.auth)
      {
        //inserisco nel carrello del DB e poi nel carrello locale
        this.products.push( product )
      }
      else{
        const cart = localStorage.getItem("cart") //retrieve cart
        let jsonCart

        if (cart != null) {
        jsonCart = JSON.parse(cart)
      } else {
        jsonCart = {
        ids: [],
        }
      }
    jsonCart.ids.push({ product_id: product.id }) //push new id to the cart
    localStorage.setItem("cart", JSON.stringify(jsonCart)) //update localstorage
  }
}*/

    removeProductFromCart(product) {
        if(this.products.find(product).quantity > 1)
        {
          this.products.map(obj => obj == product ? obj.quantity = obj.quantity-1 : obj)
        }
        else
        {
          this.products = this.products.filter(obj => obj != product);
        }
    }

    getProducts() {
        return this.products
    }
}


export default CartModel