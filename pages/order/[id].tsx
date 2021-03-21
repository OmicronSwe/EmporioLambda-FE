import React from "react";
import { GetServerSideProps } from "next";

import { useRouter } from "next/dist/client/router";
import Layout from "../../components/layout";
import OrderDetail from "../../components/Order/OrderDetail";

import { getOrderDetails } from "../api/Services/order";

class OrderPage extends React.Component<{ order }> {
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
      order: await getOrderDetails(id),
    },
  };
};

export default OrderPage;
