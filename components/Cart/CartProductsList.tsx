import { useRouter } from "next/router";
import React, { useState } from "react";
import { Button, Table, Alert } from "react-bootstrap";
import Cart from "../../src/types/Cart";

interface CartProductListProps {
  cart: Cart;
  removeOnClick;
  changeProductQuantity;
  insertAlert: boolean | null;
  removeAlert: boolean | null;
  fetchAlert: boolean | null;
  disabled: boolean;
  setDisabledState;
}

const CartProductList = ({
  cart,
  removeOnClick,
  changeProductQuantity,
  insertAlert,
  removeAlert,
  fetchAlert,
  disabled,
  setDisabledState,
}: CartProductListProps) => {
  const router = useRouter();
  const { error } = router.query;
  const [show, setShow] = useState(true);

  if (cart !== null && cart.products.length > 0)
    return (
      <>
        {error ? (
          <Alert variant="warning">
            <Alert.Heading className="text-center">{error}</Alert.Heading>
          </Alert>
        ) : (
          ""
        )}

        <Table className="product-list" borderless>
          <caption className="text-center"> Shopping Cart </caption>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {cart.products.map((cartProduct) => (
              <tr key={cartProduct.product.id}>
                <td>
                  {cartProduct.product.imageUrl ? (
                    <img
                      src={cartProduct.product.imageUrl}
                      alt={cartProduct.product.description}
                      width="100"
                    />
                  ) : (
                    ""
                  )}
                </td>
                <td id={`${cartProduct.product.id}name`}>{cartProduct.product.name}</td>
                <td>{cartProduct.product.description}</td>
                <td id={`${cartProduct.product.id}price`}>{`€${cartProduct.product.price}`}</td>
                <td>
                  {!disabled ? (
                    <input
                      id={cartProduct.product.id}
                      type="number"
                      value={cartProduct.quantity}
                      min="1"
                      onChange={(event) => {
                        setDisabledState(true);
                        changeProductQuantity(cartProduct.product.id, event);
                        setDisabledState(false);
                      }}
                    />
                  ) : (
                    <input
                      id={`${cartProduct.product.id}"quantity"`}
                      type="number"
                      value={cartProduct.quantity}
                      min="1"
                      onChange={(event) => changeProductQuantity(cartProduct.product.id, event)}
                      disabled
                    />
                  )}
                </td>
                <td>
                  <Button
                    id={cartProduct.product.id}
                    variant="primary"
                    onClick={() => {
                      removeOnClick(cartProduct.product.id);
                      setShow(true);
                    }}
                  >
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {insertAlert === true ? (
          <Alert variant="danger">
            <Alert.Heading className="text-center">
              A problem occurred while inserting the item from the cart
            </Alert.Heading>
          </Alert>
        ) : null}
        {insertAlert === false ? (
          <Alert variant="success">
            <Alert.Heading className="text-center">
              Item correctly inserted to the cart
            </Alert.Heading>
          </Alert>
        ) : null}
        {removeAlert === true ? (
          <Alert variant="danger" show={show} onClose={() => setShow(false)} dismissible>
            <Alert.Heading className="text-center">
              A problem occurred while removing the item from the cart
            </Alert.Heading>
          </Alert>
        ) : null}
        {removeAlert === false ? (
          <Alert variant="success" show={show} onClose={() => setShow(false)} dismissible>
            <Alert.Heading className="text-center">
              Item correctly removed from the cart
            </Alert.Heading>
          </Alert>
        ) : null}
        {fetchAlert === true ? (
          <Alert variant="danger">
            <Alert.Heading className="text-center">
              A problem occured while getting the necessary data
            </Alert.Heading>
          </Alert>
        ) : null}
      </>
    );

  return (
    <>
      <h3 className="text-center">Your cart is empty</h3>
      {removeAlert === true ? (
        <Alert variant="danger" show={show} onClose={() => setShow(false)} dismissible>
          <Alert.Heading className="text-center">
            A problem occurred while removing the item from the cart
          </Alert.Heading>
        </Alert>
      ) : null}
      {removeAlert === false ? (
        <Alert variant="success" show={show} onClose={() => setShow(false)} dismissible>
          <Alert.Heading className="text-center">
            Item correctly removed from the cart
          </Alert.Heading>
        </Alert>
      ) : null}
    </>
  );
};

export default CartProductList;
