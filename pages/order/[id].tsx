import React from "react";
import { GetServerSideProps } from "next";

import { useRouter } from "next/dist/client/router";
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

export const getServerSideProps: GetServerSideProps = async () => {
  const router = useRouter();
  const { id } = router.query;

  return {
    props: {
      order: await getOrderDetails(String(id)),
    },
  };
};

export default OrderPage;
