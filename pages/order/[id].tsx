import React from "react";
import { GetServerSideProps } from "next";

import Layout from "../../components/layout";
import OrderDetail from "../../components/Order/OrderDetail";

import { getOrderDetails } from "../api/Services/order";
import { Order } from "../../src/objects/Order";

class OrderPage extends React.Component<{ order: Order }> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { order } = this.props;
    return (
      <>
        <Layout title="Order detail page">
          <OrderDetail order={order} />
        </Layout>
      </>
    );
  }
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  return {
    props: {
      order: await getOrderDetails(params.id.toString()),
    },
  };
};

export default OrderPage;
