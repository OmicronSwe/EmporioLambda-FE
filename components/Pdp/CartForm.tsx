import React from "react";
import { Alert, Button, Form } from "react-bootstrap";

interface AddCartProps {
  addCart;
  addedCartAlert: boolean;
}

const CartForm = ({ addCart, addedCartAlert }: AddCartProps) => {
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
      {addedCartAlert !== null && addedCartAlert === true ? (
        <Alert variant="success">
          <Alert.Heading id="AlertSuccess">Product added to cart successfully!</Alert.Heading>
        </Alert>
      ) : (
        <p />
      )}
      {addedCartAlert !== null && addedCartAlert === false ? (
        <Alert variant="danger">
          <Alert.Heading>ERROR! Product was not correctly added to the cart!</Alert.Heading>
        </Alert>
      ) : (
        <p />
      )}
    </>
  );
};

export default CartForm;
