import React from "react";
import Router from "next/router";
import { Table, Button } from "react-bootstrap";
import { Order } from "../../src/objects/Order";

class ProductList extends React.Component<{ orders: Order[] }> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { orders } = this.props;
    return (
      <>
        {orders ? (
          <Table>
            <thead className="thead-light">
              <tr>
                <th>ID ordine</th>
                <th>Date</th>
                <th>Total cost</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.date}</td>
                  <td>{item.totalCost}</td>
                  <td>
                    <Button variant="primary" onClick={() => Router.push(`/profile/order/${item.id}`)}>Details</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <h3>No orders found</h3>
        )}
      </>
    );
  }
}

export default ProductList;