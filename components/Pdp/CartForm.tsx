import React, { useState } from "react";
import { Alert, Button, Container, Form, Row } from "react-bootstrap";

interface AddCartProps {
  addCart;
  addedCartAlert: boolean;
}

const CartForm = ({ addCart, addedCartAlert }: AddCartProps) => {
  const [show, setShow] = useState(true);
  return (
    <>
      <Container>
        <Row className="justify-content-md-center mt-3">
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
            <Button type="submit" className="add" onClick={() => setShow(true)}>
              Add to cart
            </Button>
          </Form>
        </Row>
        <Row className="justify-content-md-center mt-3">
          {addedCartAlert !== null && addedCartAlert === true ? (
            <Alert variant="success" show={show} onClose={() => setShow(false)} dismissible>
              <Alert.Heading id="AlertSuccess" className="text-center">
                Product added to cart successfully!
              </Alert.Heading>
            </Alert>
          ) : (
            <p />
          )}
          {addedCartAlert !== null && addedCartAlert === false ? (
            <Alert variant="danger" show={show} onClose={() => setShow(false)} dismissible>
              <Alert.Heading className="text-center">
                ERROR! Product was not correctly added to the cart!
              </Alert.Heading>
            </Alert>
          ) : (
            <p />
          )}
        </Row>
      </Container>
    </>
  );
};

export default CartForm;
