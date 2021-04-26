import React from "react";
import { GetServerSideProps } from "next";

import { getSession } from "next-auth/client";
import Layout from "../../../components/layout";
import OrderDetail from "../../../components/Order/OrderDetail";

import { getOrderDetails } from "../../../src/Services/order";
import Order from "../../../src/types/Order";

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

export const getServerSideProps: GetServerSideProps = async ({ params, req }) => {
  const session = await getSession({ req });

  return {
    props: {
      order: await getOrderDetails(params.id.toString(), session),
    },
  };
};

export default OrderPage;
