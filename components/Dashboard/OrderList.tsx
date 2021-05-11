import React from "react";
import { Table, Button } from "react-bootstrap";
import Order from "../../src/types/Order";

interface OrderListProps {
  orders: Order[];
}

const OrderList = ({ orders }: OrderListProps) => {
  return (
    <>
      {orders ? (
        <Table>
          <thead className="thead-light">
            <tr>
              <th>ID ordine</th>
              <th>Client</th>
              <th>Total cost</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.email}</td>
                <td>{`${item.totalPrice.toFixed(2)}€`}</td>
                <td>{`${new Date(item.date).toLocaleDateString()}`}</td>
                <td>
                  <Button variant="primary">Details</Button>
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
};

export default OrderList;
