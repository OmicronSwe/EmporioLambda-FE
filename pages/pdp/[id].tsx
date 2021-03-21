import React from "react";
import { GetServerSideProps } from "next";

import { getSession } from "next-auth/client";
import Layout from "../../components/layout";
import ProductSection from "../../components/Pdp/ProductSection";
import { getProduct } from "../api/Services/product";
import CartSection from "../../components/Pdp/CartSection";
import { Product } from "../../src/objects/Product";
// import CartSection from "../../components/Pdp/CartSection";

class ProductPage extends React.Component<{ product: Product; session }> {
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
          <CartSection session={session} id={product.id} />
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

export default ProductPage;
