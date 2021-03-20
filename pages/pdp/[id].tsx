import React from "react";
import { GetServerSideProps } from "next";

import { getSession } from "next-auth/client";
import Layout from "../../components/layout";
import ProductSection from "../../components/Pdp/ProductSection";
import { getProduct } from "../api/Services/product";
import CartSection from "../../components/Pdp/CartSection";
// import CartSection from "../../components/Pdp/CartSection";

class Product extends React.Component<{ product; session }> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { product, session } = this.props;
    return (
      <>
        <Layout title="Product page">
          <ProductSection product={product} />
          <CartSection session={session} id={product.result.id} />
        </Layout>
      </>
    );
  }
}

export const getServerSideProps: GetServerSideProps = async ({ params, req }) => {
  return {
    props: {
      product: await getProduct(params.id.toString()),
      session: await getSession({ req }),
    },
  };
};

export default Product;
