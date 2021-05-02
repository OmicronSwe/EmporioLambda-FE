import React from "react";
import { Button } from "react-bootstrap";
import Cart from "../../src/types/Cart";

class RemoveAllButton extends React.Component<{ cart: Cart; removeAllProduct }> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { cart, removeAllProduct } = this.props;
    if (cart.products.length > 0)
      return (
        <>
          <Button variant="primary" onClick={() => removeAllProduct()}>
            Remove All
          </Button>
        </>
      );
    return null;
  }
}

export default RemoveAllButton;