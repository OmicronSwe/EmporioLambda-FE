import React from "react";
import { Button } from "react-bootstrap";
import CartProductList from "./CartProductsList";
import ProductInCart from "../../src/objects/ProductInCart";
import {
  removeProductFromCart,
  removeAllProductsFromCart,
  getProductsInCart,
  insertProductInCart,
} from "../../pages/api/Services/cart";

class CartListSection extends React.Component<
  { products: ProductInCart[]; auth },
  { products: ProductInCart[] }
> {
  tax;

  constructor(props) {
    super(props);
    this.tax = 0.2;
    const { products } = this.props;
    /*
    const products = [{"id" : "12345", "name" : "dddddd", "price" : 33, "description" : " ", "imageUrl" : null, "quantity" : 3},{"id" : "123456", "name" : "ccccc", "price" : 33, "description" : " ", "imageUrl" : null, "quantity" : 3}];
    */
    this.state = { products };
  }

  componentDidMount() {
    const { auth } = this.props;
    if (!auth) {
      const { products } = this.state;
      const ids: string = ProductInCart.toStringForLocalStorage(products);
      localStorage.setItem("cart", ids);
    }
  }

  removeAllProductOnClick = async () => {
    const { auth } = this.props;
    if (auth) {
      // authenticated -> internal API to call external API to delete the cart
      const resp = await removeAllProductsFromCart(auth);
      if (resp) {
        this.setState({ products: [] });
      } else {
        // Mostra messaggio di errore
      }
    } else if (localStorage) {
      // not authenticated -> empty the localStorage
      localStorage.setItem("cart", "[]");
      this.setState({ products: [] });
    }
  };

  removeProductOnClick = async (id: string) => {
    const { auth } = this.props;
    const { products } = this.state;
    if (id) {
      if (auth) {
        const resp = await removeProductFromCart({ auth, body: { id } });
        if (resp) {
          const respGetCart: any = await getProductsInCart(auth);
          if (respGetCart != null) {
            this.setState({ products: respGetCart.products });
          } else {
            // Mostra messaggio di errore
          }
        } else {
          // Mostra messaggio di errore
        }
      } else if (localStorage) {
        let jsonCart: string;
        jsonCart = localStorage.getItem("cart");
        const jsonObj: ProductInCart[] = products;
        const i: number = 0;
        jsonObj.forEach((element) => {
          if (element.id === id) {
            jsonObj.splice(i, 1);
          }
        });
        jsonCart = ProductInCart.toStringForLocalStorage(jsonObj);
        localStorage.setItem("cart", jsonCart);
        this.setState({ products: jsonObj });
      }
    }
  };

  changeProductQuantity = async (id: string, event) => {
    if (event.target.value > 0) {
      const { auth } = this.props;
      const { products } = this.state;
      if (auth) {
        products.forEach(async (product) => {
          if (product.id === id) {
            if (product.quantity > event.target.value) {
              const quantityToRemove = product.quantity - event.target.value;
              const response = await removeProductFromCart({
                auth,
                body: { id, quantity: quantityToRemove },
              });
              if (response) {
                const productsList: any = await getProductsInCart(auth);
                if (productsList != null) this.setState({ products: productsList.products });
                else {
                  // Mostra messaggio di errore
                }
              } else {
                // Mostra messaggio di errore
              }
            } else {
              const quantityToAdd = event.target.value - product.quantity;
              const response = await insertProductInCart({
                auth,
                body: { id, quantity: quantityToAdd },
              });
              if (response) {
                const productsList: any = await getProductsInCart(auth);
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
        let jsonCart: string;
        jsonCart = localStorage.getItem("cart");
        const jsonObj: ProductInCart[] = products;
        jsonObj.forEach((element) => {
          if (element.id === id) {
            element.quantity = event.target.value;
          }
        });
        jsonCart = ProductInCart.toStringForLocalStorage(jsonObj);
        localStorage.setItem("cart", jsonCart);
        this.setState({ products: jsonObj });
      }
    }
  };

  getRemoveAllButton = (products: ProductInCart[]) => {
    if (products.length > 0)
      return (
        <Button variant="primary" onClick={() => this.removeAllProductOnClick()}>
          Remove All
        </Button>
      );
    return null;
  };

  render() {
    const { auth } = this.props;
    const { products } = this.state;
    return (
      <>
        <h1>Cart Section</h1>
        <CartProductList
          auth={auth}
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
