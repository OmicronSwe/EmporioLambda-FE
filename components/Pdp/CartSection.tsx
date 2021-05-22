import React from "react";
import { insertCart } from "../../src/Services/product";
import StoredProduct from "../../src/types/StoredProduct";
import CartForm from "./CartForm";

class CartSection extends React.Component<
  { session; product: StoredProduct },
  { addedCartAlert: boolean | null }
> {
  constructor(props) {
    super(props);
    this.state = { addedCartAlert: null };
  }

  addCart = async (event) => {
    // conversione parametri in stringJSON
    event.preventDefault();

    const { session, product } = this.props;

    const resp = await insertCart(session, product.id, Number(event.target.quantity.value));

    if (resp) {
      this.setState({ addedCartAlert: true });
    } else {
      this.setState({ addedCartAlert: false });
    }
  };

  render() {
    const { addedCartAlert } = this.state;
    return (
      <>
        <CartForm addCart={this.addCart} addedCartAlert={addedCartAlert} />
      </>
    );
  }
}

export default CartSection;
