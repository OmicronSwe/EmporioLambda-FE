import React from "react";
import Router from "next/router";
import { Table, Button } from "react-bootstrap";
import Order from "../../src/types/Order";

interface ProductListProps {
  orders: Order[];
}

const ProductList = ({ orders }: ProductListProps) => {
  return (
    <>
      {orders ? (
        <Table id="orderList">
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
                <td>{`${new Date(item.date).toLocaleDateString()}`}</td>
                <td>{`${item.totalPrice.toFixed(2)}€`}</td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => Router.push(`/profile/order/${item.id}`)}
                  >
                    Details
                  </Button>
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

export default ProductList;
