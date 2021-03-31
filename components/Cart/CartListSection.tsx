import React from "react";
import { Button } from "react-bootstrap";
import CartProductList from "./CartProductsList";
import ProductInCart from "../../src/objects/ProductInCart";
import {
  removeProductFromCart,
  removeAllProductsFromCart,
  getProductsInCart,
  insertProductInCart,
  getProductsFromLocalStorage,
} from "../../pages/api/Services/cart";

class CartListSection extends React.Component<
  { products: ProductInCart[]; session },
  { products: ProductInCart[] }
> {
  tax;

  constructor(props) {
    super(props);
    this.tax = 0.2;
    const { products } = this.props;
    this.state = { products };
  }

  componentDidMount = async () => {
    const { session } = this.props;
    if (!session) {
      const products = await getProductsFromLocalStorage(session);
      this.setState({ products });
    }
  };

  removeAllProductOnClick = async () => {
    const { session } = this.props;
    if (session) {
      // authenticated -> internal API to call external API to delete the cart
      const resp = await removeAllProductsFromCart(session);
      if (resp) {
        this.setState({ products: [] });
      } else {
        // Mostra messaggio di errore
      }
    } else if (localStorage) {
      // not authenticated -> empty the localStorage
      localStorage.setItem("cart", '{"items": []}');
      this.setState({ products: [] });
    }
  };

  removeProductOnClick = async (id: string) => {
    const { session } = this.props;
    const { products } = this.state;
    if (id) {
      if (session) {
        const resp = await removeProductFromCart(id, session);
        if (resp) {
          const respGetCart: any = await getProductsInCart(session);
          if (respGetCart != null) {
            this.setState({ products: respGetCart.products });
          } else {
            // Mostra messaggio di errore
          }
        } else {
          // Mostra messaggio di errore
        }
      } else if (localStorage) {
        const stateProducts: ProductInCart[] = products;

        for (let i = 0; i < stateProducts.length; i += 1) {
          const item = stateProducts[i];
          if (item.id === id) {
            stateProducts.splice(i, 1);
            break;
          }
        }

        localStorage.setItem("cart", ProductInCart.toStringForLocalStorage(stateProducts));
        this.setState({ products: stateProducts });
      }
    }
  };

  changeProductQuantity = async (id: string, event) => {
    if (event.target.value > 0) {
      const { session } = this.props;
      const { products } = this.state;
      if (session) {
        // TODO
        products.forEach(async (product) => {
          if (product.id === id) {
            if (product.quantity > event.target.value) {
              const quantityToRemove = product.quantity - event.target.value;
              const response = await removeProductFromCart(id, session, quantityToRemove);
              if (response) {
                const productsList: any = await getProductsInCart(session);
                if (productsList != null) this.setState({ products: productsList.products });
                else {
                  // Mostra messaggio di errore
                }
              } else {
                // Mostra messaggio di errore
              }
            } else {
              const quantityToAdd = event.target.value - product.quantity;
              const response = await insertProductInCart(id, quantityToAdd, session);
              if (response) {
                const productsList: any = await getProductsInCart(session);
                if (productsList != null) this.setState({ products: productsList.products });
                else {
                  // Mostra messaggio di errore
                }
              } else {
                // Mostra messaggio di errore
              }
            }
            product.quantity = event.target.value;
          }
        });
      } else {
        const jsonObj: ProductInCart[] = products;
        jsonObj.forEach((element) => {
          if (element.id === id) {
            element.quantity = event.target.value;
          }
        });
        localStorage.setItem("cart", ProductInCart.toStringForLocalStorage(jsonObj));
        this.setState({ products: jsonObj });
      }
    }
  };

  // TODO
  getRemoveAllButton = (products: ProductInCart[]) => {
    if (products.length > 0)
      return (
        <Button variant="primary" onClick={() => this.removeAllProductOnClick()}>
          Remove All
        </Button>
      );
    return null;
  };

  // TODO
  render() {
    const { session } = this.props;
    const { products } = this.state;
    return (
      <>
        <h1>Cart Section</h1>
        <CartProductList
          auth={session}
          products={products}
          removeOnClick={this.removeProductOnClick}
          changeProductQuantity={this.changeProductQuantity}
        />
        {this.getRemoveAllButton(products)}
        <br />
        Products cost:
        {`€${ProductInCart.getProductsSum(products).toString()}`}
        <br />
        Tax cost:
        {`${(this.tax * 100).toString()}%`}
        <br />
        Total cost:
        {`€${
          ProductInCart.getProductsSum(products) + ProductInCart.getProductsSum(products) * this.tax
        }`}
      </>
    );
  }
}

export default CartListSection;
