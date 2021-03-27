import React from "react";
import { Button } from "react-bootstrap";
import CartProductList from "./CartProductsList";
import CartSample from "./CartSample";
import ProductInCart from "../../src/objects/ProductInCart";
import { removeProductFromCart, removeAllProductsFromCart, getProductsInCart } from "../../pages/api/Services/cart";
import CartModifiableButton from "./CartModifiableButton";
import {decode} from 'jsonwebtoken'

class CartListSection extends React.Component<
  { products: ProductInCart[]; auth },
  { products: ProductInCart[]; modifiable : boolean }
> {
  tax;

  constructor(props) {
    super(props);
    const products: ProductInCart[] = CartSample;
    const modifiable = false
    this.state = { products, modifiable };
    this.tax = 0.2;
  }

  componentDidMount() {
    const { products } = this.state;
    const { auth } = this.props;
    if(!auth)
    {
      const ids: string = ProductInCart.toStringForLocalStorage(products);
      localStorage.setItem("cart", ids);
    }
  }

  setModifiable = () => {
    const {modifiable} = this.state
    modifiable ? this.setState({modifiable : false}) : this.setState({modifiable : true});
  }

  removeAllProductOnClick = async () => {
    const { auth } = this.props
    if (auth) {
      // authenticated -> internal API to call external API to delete the cart
      const resp = await removeAllProductsFromCart(auth);
      if(resp)
      {
        this.setState({ products: [] });
      } else
      {
        //Mostra messaggio di errore
      }
    } else if (localStorage) {   // not authenticated -> empty the localStorage
        localStorage.setItem("cart", "[]");
        this.setState({ products: [] });
      }
  };

  removeProductOnClick = async (id: string) => {
    const { auth } = this.props
    const { products } = this.state 
    if (id) {
      if (auth) {
        const resp = await removeProductFromCart(auth, {"id" : id })
        if(resp)
        {
          const respGetCart = await getProductsInCart(auth);
          if(respGetCart != null)
          {
            this.setState({ products : JSON.parse(respGetCart["products"]) })
          }else
          {
              //Mostra messaggio di errore
          }
        }else{
          //Mostra messaggio di errore
        }
      } else if (localStorage) {
        let jsonCart: string;
        jsonCart = localStorage.getItem("cart");
        const jsonObj: ProductInCart[] = products;
        let i: number = 0;
        for(let element of jsonObj)
        {
          if (element.id === id) {
          jsonObj.splice(i, 1);
          break;
          }
        }
        jsonCart = ProductInCart.toStringForLocalStorage(jsonObj);
        localStorage.setItem("cart", jsonCart);
        this.setState({ products: jsonObj });
      }
    }
  };

  setModifiableButton = async () => {
    const {auth} = this.props;
    const {products} = this.state;
    const {modifiable} = this.state;
    if(modifiable)
    {
      this.setState({modifiable : false});
    } else
    {
      this.setState({modifiable : true});
    }
    if(auth)
    {
      const dbProducts = await getProductsInCart(auth);
      if(dbProducts != null)
      {
          JSON.parse(dbProducts["products"]).forEach((dbProduct) => {
            products.forEach((product) => {
              if(dbProduct["id"]===product.id)
              {
                
              }
            })
          })
      }
    }
    else
    {

    }
    return modifiable;
  }


  getRemoveAllButton = (modifiable : boolean) => {
    return modifiable ?
    <Button variant="primary" onClick={() => this.removeAllProductOnClick()}>Remove All</Button> :
    <Button variant="primary" onClick={() => this.removeAllProductOnClick()} disabled>Remove All</Button>
  }

  render() {
    const { auth } = this.props
    const { products, modifiable } = this.state
    return (
      <>
        <h1>Cart Section</h1>
        <CartProductList
          auth={auth}
          products={products}
          removeOnClick={this.removeProductOnClick}
          modifiable ={modifiable}
        />
        {this.getRemoveAllButton(modifiable)}
        <CartModifiableButton active={modifiable} onClickFunction={()=>this.setModifiableButton()}/> <br/>
        <label>Products cost: {ProductInCart.getProductsSum(products)}</label> <br/>
        <label>Tax cost: {this.tax*100} %</label> <br/>
        <label>Total cost: {ProductInCart.getProductsSum(products)+ProductInCart.getProductsSum(products)*this.tax}</label>
      </>
    );
  }
}

export default CartListSection;
