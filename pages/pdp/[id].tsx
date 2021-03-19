import React from "react";
import { GetServerSideProps } from "next";

import Layout from "../../components/layout";
import ProductSection from "../../components/Pdp/ProductSection";
import getProduct from "../api/Services/product";
// import CartSection from "../../components/Pdp/CartSection";

class Product extends React.Component<{ product }> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { product } = this.props;
    return (
      <>
        <Layout title="Product page">
          <ProductSection product={product} />
        </Layout>
      </>
    );
  }
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  return {
    props: {
      product: await getProduct(params.id.toString()),
    },
  };
};

export default Product;
