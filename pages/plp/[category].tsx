import React from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";


import Layout from "../../components/layout";
import ProductSection from "../../components/Dashboard/ProductSection";
import CategorySection from "../../components/Dashboard/CategorySection";
import OrderSection from "../../components/Dashboard/OrderSection";

import CategoryProduct from "../../components/plp/CategoryProduct";

import { getProducts, getCategories } from "../api/Services/dashboard";
import Product from "../../src/objects/Product";
import getlambdaResponse from "../api/lib/lambdas";
import ProductList from "../../components/plp/CategoryProduct";
import Category from "../../src/objects/Category";

class Dashboard extends React.Component<{ products; session; categories }> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  export const getCategories=async(): Promise<Category[]> =>{
    const response = (await getlambdaResponse("products","GET")).props.responde.result.items;
}


  render() {
    const { products, categories } = this.props;
    return (
      <>
        <Layout title="Category Products">
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
