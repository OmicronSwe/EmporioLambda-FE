import React from "react";
import CartProductList from "./CartProductsList";
import { Button } from "react-bootstrap"
import CartSample from "./CartSample"
import ProductInCart from "../../src/objects/ProductInCart"


class CartListSection extends React.Component<{ products : ProductInCart[], auth }, { products : ProductInCart[] }> {
    constructor(props) {
        super(props);
        const products : ProductInCart[] = CartSample;
        this.state = { products };
    }
    
    componentDidMount() {
      let ids : string = ProductInCart.toStringForLocalStorage(this.state.products)
      localStorage.setItem('cart', ids)
    }

    removeAllProductOnClick = async () => {
    if (this.props.auth) {
        //authenticated -> internal API to call external API to delete the cart
        const res = await fetch("../api/deleteCart", {
          body: this.props.auth,
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        })
        await res.json()
      } else {
        //not authenticated -> empty the localStorage
        if(localStorage)
        {
            localStorage.setItem('cart', '[]')
            this.setState({ products : [] })
        }
      }
};

    removeProductOnClick = async (id : string) => {
    if(id)
    {
        if(this.props.auth)
        {
            
        }else
        {
            if(localStorage)
            {
            let jsonCart : string
            jsonCart = localStorage.getItem('cart')
            let jsonObj : ProductInCart[] = JSON.parse(jsonCart)
            let i : number = 0
            while(i < jsonObj.length)
            {
                if(jsonObj[i].id == id)
                {
                    jsonObj.splice(i, 1);
                    break;
                }
                i++;
            }

            jsonCart = JSON.stringify(jsonObj);
            localStorage.setItem('cart', jsonCart);
            this.setState({ products : jsonObj })
            }
        }
    }
    };

  render() {
    return (
      <>
        <h1>Cart Section</h1>
        <CartProductList auth={this.props.auth} products={this.state.products} removeOnClick={this.removeProductOnClick}/>
        <Button variant="primary" onClick={()=>this.removeAllProductOnClick()}>Remove All</Button>
      </>
    );
  }
}

export default CartListSection;