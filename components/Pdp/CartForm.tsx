import React from "react";
import { Button, Form } from "react-bootstrap";

interface AddCartProps {
  addCart;
}

const CartForm = ({ addCart }: AddCartProps) => {
  return (
    <>
      <Form inline onSubmit={addCart}>
        <Form.Control
          as="select"
          className="addCart"
          id="inlineFormCustomSelectPref"
          name="quantity"
          custom
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </Form.Control>
        <Button type="submit" className="add">
          Add to cart
        </Button>
      </Form>
    </>
  );
};

export default CartForm;
