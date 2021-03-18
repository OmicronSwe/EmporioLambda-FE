import React from "react";
import { GetServerSideProps } from "next";

import Layout from "../../components/layout";
import ProductSection from "../../components/Pdp/ProductSection";
// import CartSection from "../../components/Pdp/CartSection";
import { getProduct } from "../api/Services/product";

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
      product: await getProduct(params.id[0]),
    },
  };
};

export default Product;
