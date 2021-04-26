import React from "react";
import { Button, Table } from "react-bootstrap";
import Cart from "../../types/Cart";

class CartProductList extends React.Component<
  { auth; cart: Cart; removeOnClick; changeProductQuantity },
  { disabled: boolean }
> {
  constructor(props) {
    super(props);
    const disabled = false;
    this.state = { disabled };
  }

  render() {
    const { disabled } = this.state;
    const { cart, removeOnClick, changeProductQuantity } = this.props;
    if (cart.products.length > 0)
      return (
        <Table className="product-list" borderless>
          <caption> Shopping Cart </caption>
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
                    <img src={cartProduct.product.imageUrl} alt={cartProduct.product.description} width="100" />
                  ) : (
                    ""
                  )}
                </td>
                <td>{cartProduct.product.name}</td>
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
                        this.setState({ disabled: true });
                        changeProductQuantity(cartProduct.product.id, event);
                        this.setState({ disabled: false });
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
                  <Button variant="primary" onClick={() => removeOnClick(cartProduct.product.id)}>
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      );
    return <h2>Your cart is empty</h2>;
  }
}

export default CartProductList;
