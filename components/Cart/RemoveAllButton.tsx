import React from "react";
import { Button } from "react-bootstrap";
import Cart from "../../src/types/Cart";

interface ProductListProps {
  cart: Cart;
  removeAllProduct;
}

const RemoveAllButton = ({ cart, removeAllProduct }: ProductListProps) => {
  if (cart && cart.products.length > 0)
    return (
      <>
        <Button variant="primary" onClick={() => removeAllProduct()}>
          Remove All
        </Button>
      </>
    );
  return null;
};

export default RemoveAllButton;
