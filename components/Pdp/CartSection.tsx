import React from "react";
import { insertCart } from "../../src/Services/product";
import StoredProduct from "../../src/types/StoredProduct";
import CartForm from "./CartForm";

class CartSection extends React.Component<{ session; product: StoredProduct }> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  addCart = async (event) => {
    // conversione parametri in stringJSON
    event.preventDefault();

    const { session, product } = this.props;
    await insertCart(session, product, Number(event.target.quantity.value));
  };

  render() {
    return (
      <>
        <CartForm addCart={this.addCart} />
      </>
    );
  }
}

export default CartSection;
