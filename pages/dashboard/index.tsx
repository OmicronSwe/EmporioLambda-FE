import React from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import getlambdaResponse from "../api/lib/lambdas";

import Layout from "../../components/layout";
import ProductSection from "../../components/Dashboard/ProductSection";
import CategorySection from "../../components/Dashboard/CategorySection";
import OrderSection from "../../components/Dashboard/OrderSection";

class Dashboard extends React.Component<{ products; session; categories }> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { products, categories } = this.props;
    return (
      <>
        <Layout title="Dashboard page">
          <ProductSection products={products} />
          <CategorySection categories={categories} />
          <OrderSection />
        </Layout>
      </>
    );
  }
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return {
    props: {
      products: await (await getlambdaResponse("product", "GET")).props.response,
      categories: await (await getlambdaResponse("category", "GET")).props.response,
      session: await getSession({ req }),
    },
  };
};

export default Dashboard;
