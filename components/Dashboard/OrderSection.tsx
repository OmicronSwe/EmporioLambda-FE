import React from "react";
import Order from "../../src/types/Order";
import OrderList from "./OrderList";

class OrderSection extends React.Component<{ orders: Order[] }> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { orders } = this.props;
    return (
      <>
        <h1>Order section</h1>
        <OrderList orders={orders} />
      </>
    );
  }
}

export default OrderSection;
