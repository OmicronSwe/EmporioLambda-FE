import React from "react";
import CartProductList from "./CartProductsList";
import {
  removeProductFromCart,
  removeAllProductsFromCart,
  getProductsInCart,
  insertProductInCart,
  getProductsFromLocalStorage,
} from "../../src/Services/cart";
import Cart from "../../src/types/Cart";
import SummaryInfo from "./SummaryInfo";
import RemoveAllButton from "./RemoveAllButton";

class CartListSection extends React.Component<{ cart: Cart; session }, { cart: Cart; insertAlert: boolean | null; removeAlert: boolean | null; fetchAlert: boolean | null}> {
  tax: number;

  constructor(props) {
    super(props);
    this.tax = 0.2;
    const { cart } = this.props;
    this.state = { cart, insertAlert: null, removeAlert: null, fetchAlert: null };
  }

  componentDidMount = async () => {
    const { session } = this.props;
    if (!session) {
      try{
      const cart = await getProductsFromLocalStorage(session);
      this.setState({ cart });
      }
      catch(e){
      localStorage.setItem("cart", "{items: []}");
      const cart = new Cart([]);
      this.setState({ cart });
      }
    }
  };

  removeAllProduct = async () => {
    this.setState({removeAlert: null});
    const { session } = this.props;
    if (session) {
      // authenticated -> internal API to call external API to delete the cart
      const resp = await removeAllProductsFromCart(session);
      if (resp) {
        this.setState({ cart: new Cart([]), removeAlert:false });
      } else {
        this.setState({removeAlert: true});
      }
    } else if (localStorage) {
      // not authenticated -> empty the localStorage
      localStorage.setItem("cart", '{"items": []}');
      this.setState({ cart: new Cart([]) });
    }
  };

  removeProduct = async (id: string) => {
    this.setState({removeAlert: null, fetchAlert: null});
    const { session } = this.props;
    const { cart } = this.state;
    if (id) {
      if (session) {
        const resp = await removeProductFromCart(id, session);
        if (resp) {
          const respGetCart: any = await getProductsInCart(session);
          if (respGetCart != null) {
            this.setState({ cart: respGetCart, removeAlert:false });
          } else {
            // Mostra messaggio di errore
            this.setState({fetchAlert: true});
          }
        } else {
          // Mostra messaggio di errore
          this.setState({removeAlert: true});
        }
      } else if (localStorage) {
        const stateCart: Cart = cart;
        try{
          for (let i = 0; i < stateCart.products.length; i += 1) {
          const item = stateCart.products[i];
          if (item.product.id === id) {
            stateCart.products.splice(i, 1);
            break;
          }
        }
      }catch(e)
      {
        localStorage.setItem("cart", '{"items": []}');
        this.setState({removeAlert: true});
      }
        localStorage.setItem("cart", cart.toStringForLocalStorage());
        this.setState({ cart: stateCart, removeAlert: false });
      }
    }
  };

  changeProductQuantity = async (id: string, event) => {
    this.setState({removeAlert: null, fetchAlert: null, insertAlert: null});
    if (event.target.value > 0) {
      const { session } = this.props;
      const { cart } = this.state;
      if (session) {
        // TODO
        cart.products.forEach(async (cartProduct) => {
          if (cartProduct.product.id === id) {
            if (cartProduct.quantity > event.target.value) {
              const quantityToRemove = cartProduct.quantity - event.target.value;
              const response = await removeProductFromCart(id, session, quantityToRemove);
              if (response) {
                const newCart: any = await getProductsInCart(session);
                if (newCart != null) this.setState({ cart: newCart });
                else {
                  // Mostra messaggio di errore
                  this.setState({fetchAlert:true});
                }
              } else {
                // Mostra messaggio di errore
                this.setState({removeAlert: true});
              }
            } else {
              const quantityToAdd = event.target.value - cartProduct.quantity;
              const response = await insertProductInCart(id, quantityToAdd, session);
              if (response) {
                const newCart: any = await getProductsInCart(session);
                if (newCart != null)
                {
                  this.setState({ cart: newCart });
                }
                else {
                  // Mostra messaggio di errore
                  this.setState({fetchAlert:true});
                }
              } else {
                // Mostra messaggio di errore
                this.setState({insertAlert:true});
              }
            }
            cartProduct.quantity = event.target.value;
          }
        });
      } else {
        const jsonObj: Cart = cart;
        let check : boolean = false;
        let increment : boolean = false;
        jsonObj.products.forEach((element) => {
          if (element.product.id === id) {
            if(element.quantity < event.target.value) increment=true;
            element.quantity = event.target.value;
            check = true;
          }
        });
        if(check)
        {
          localStorage.setItem("cart", jsonObj.toStringForLocalStorage());
          this.setState({ cart: jsonObj });
        }
        else {
          localStorage.setItem("cart", jsonObj.toStringForLocalStorage());
          if(increment)
          this.setState({insertAlert : true});
          else 
          this.setState({removeAlert : true});
        }
      }
    }
  };

  // TODO
  render() {
    const { session } = this.props;
    const { cart, insertAlert, removeAlert, fetchAlert } = this.state;
    return (
      <>
        <h1>Cart Section</h1>
        <CartProductList
          auth={session}
          cart={cart}
          removeOnClick={this.removeProduct}
          changeProductQuantity={this.changeProductQuantity}
          insertAlert={insertAlert}
          removeAlert={removeAlert}
          fetchAlert={fetchAlert}
        />
        <RemoveAllButton cart={cart} removeAllProduct={this.removeAllProduct} />
        <SummaryInfo tax={this.tax} cart={cart} />
      </>
    );
  }
}

export default CartListSection;
