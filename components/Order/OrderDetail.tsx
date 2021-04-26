import React from "react";
import { Table } from "react-bootstrap";
import { Order } from "../../src/types/Order";

class OrderSection extends React.Component<{ order: Order }> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { order } = this.props;
    return (
      <>
        <h1>Order Details</h1>
        <Table borderless>
          <tbody>
            <tr>
              <td>
                <h3>Order Id</h3>
              </td>
              <td>{order.id}</td>
            </tr>
            <tr>
              <td>
                <h3>Email used</h3>
              </td>
              <td>{order.email}</td>
            </tr>
            <tr>
              <td>
                <h3>Client&apos;s username</h3>
              </td>
              <td>{order.username}</td>
            </tr>
            <tr>
              <td>
                <h3>Date</h3>
              </td>
              <td>{order.date}</td>
            </tr>
            <tr>
              <td>
                <h3>Products</h3>
              </td>
              <td>
                <Table>
                  <thead className="thead-light">
                    <tr>
                      <th>ID</th>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Quantity</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.products ? (
                      order.products.map((item) => (
                        <tr key={item.product.id}>
                          <td>{item.product.id}</td>
                          <td>
                            <img
                              width={100}
                              src={item.product.imageUrl ? item.product.imageUrl : ""}
                              className="img-thumbnail"
                              alt={item.product.name}
                            />
                          </td>
                          <td>{item.product.name}</td>
                          <td>{item.quantity}</td>
                          <td>
                            {item.product.price}
                            &euro;
                          </td>
                        </tr>
                      ))
                    ) : (
                      <p>No product found</p>
                    )}
                  </tbody>
                </Table>
              </td>
            </tr>
            <tr>
              <td>
                <h3>Tax applied</h3>
              </td>
              <td>{`${order.taxesApplied}%`}</td>
            </tr>
            <tr>
              <td>
                <h3>Total cost</h3>
              </td>
              <td>
                {order.totalPrice.toFixed(2)}
                &euro;
              </td>
            </tr>
          </tbody>
        </Table>
      </>
    );
  }
}

export default OrderSection;
