import React from "react";
import { Table } from "react-bootstrap";
import Order from "../../src/types/Order";

interface OrderDetailProps {
  order: Order;
}

const OrderDetail = ({ order }: OrderDetailProps) => {
  return (
    <>
      {order ? (
        <Table>
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
              <td>{`${new Date(order.date).toLocaleDateString()}`}</td>
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
                          <td>{`${item.product.price.toFixed(2)}???`}</td>
                        </tr>
                      ))
                    ) : (
                      <h3>No product found!</h3>
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
      ) : (
        <h3 className="text-center pt-4 mt-4"> Order not found! </h3>
      )}
    </>
  );
};

export default OrderDetail;
