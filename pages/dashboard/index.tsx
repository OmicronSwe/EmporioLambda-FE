import React from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";

import Layout from "../../components/layout";
import ProductSection from "../../components/Dashboard/ProductSection";
import CategorySection from "../../components/Dashboard/CategorySection";
import OrderSection from "../../components/Dashboard/OrderSection";

import { getProducts, getCategories } from "../api/Services/dashboard";
import {Category} from "../../src/objects/Category";

class Dashboard extends React.Component<{ products, session, categories : Category[] }> {
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
      products: await getProducts(),
      categories: await getCategories(),
      session: await getSession({ req }),
    },
  };
};

export default Dashboard;
