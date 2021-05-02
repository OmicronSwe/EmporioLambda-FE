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

class CartListSection extends React.Component<{ cart: Cart; session }, { cart: Cart }> {
  tax: number;

  constructor(props) {
    super(props);
    this.tax = 0.2;
    const { cart } = this.props;
    this.state = { cart };
  }

  componentDidMount = async () => {
    const { session } = this.props;
    if (!session) {
      const cart = await getProductsFromLocalStorage(session);
      this.setState({ cart });
    }
  };

  removeAllProduct = async () => {
    const { session } = this.props;
    if (session) {
      // authenticated -> internal API to call external API to delete the cart
      const resp = await removeAllProductsFromCart(session);
      if (resp) {
        this.setState({ cart: new Cart([]) });
      } else {
        // Mostra messaggio di errore
      }
    } else if (localStorage) {
      // not authenticated -> empty the localStorage
      localStorage.setItem("cart", '{"items": []}');
      this.setState({ cart: new Cart([]) });
    }
  };

  removeProduct = async (id: string) => {
    const { session } = this.props;
    const { cart } = this.state;
    if (id) {
      if (session) {
        const resp = await removeProductFromCart(id, session);
        if (resp) {
          const respGetCart: any = await getProductsInCart(session);
          if (respGetCart != null) {
            this.setState({ cart: respGetCart });
          } else {
            // Mostra messaggio di errore
          }
        } else {
          // Mostra messaggio di errore
        }
      } else if (localStorage) {
        const stateCart: Cart = cart;

        for (let i = 0; i < stateCart.products.length; i += 1) {
          const item = stateCart.products[i];
          if (item.product.id === id) {
            stateCart.products.splice(i, 1);
            break;
          }
        }

        localStorage.setItem("cart", cart.toStringForLocalStorage());
        this.setState({ cart: stateCart });
      }
    }
  };

  changeProductQuantity = async (id: string, event) => {
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
                }
              } else {
                // Mostra messaggio di errore
              }
            } else {
              const quantityToAdd = event.target.value - cartProduct.quantity;
              const response = await insertProductInCart(id, quantityToAdd, session);
              if (response) {
                const newCart: any = await getProductsInCart(session);
                if (newCart != null) this.setState({ cart: newCart });
                else {
                  // Mostra messaggio di errore
                }
              } else {
                // Mostra messaggio di errore
              }
            }
            cartProduct.quantity = event.target.value;
          }
        });
      } else {
        const jsonObj: Cart = cart;
        jsonObj.products.forEach((element) => {
          if (element.product.id === id) {
            element.quantity = event.target.value;
          }
        });
        localStorage.setItem("cart", jsonObj.toStringForLocalStorage());
        this.setState({ cart: jsonObj });
      }
    }
  };

  // TODO
  /* getRemoveAllButton = (cart: Cart) => {
    if (cart.products.length > 0)
      return (
        <Button variant="primary" onClick={() => this.removeAllProductOnClick()}>
          Remove All
        </Button>
      );
    return null;
  }; */

  // TODO
  render() {
    const { session } = this.props;
    const { cart } = this.state;
    return (
      <>
        <h1>Cart Section</h1>
        <CartProductList
          auth={session}
          cart={cart}
          removeOnClick={this.removeProduct}
          changeProductQuantity={this.changeProductQuantity}
        />
        <RemoveAllButton cart={cart} removeAllProduct={this.removeAllProduct} />
        <SummaryInfo tax={this.tax} cart={cart} />
      </>
    );
  }
}

export default CartListSection;
