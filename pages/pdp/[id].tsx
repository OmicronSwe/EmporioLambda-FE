import React from "react";
import { GetServerSideProps } from "next";

import { getSession } from "next-auth/client";
import Layout from "../../components/layout";
import ProductSection from "../../components/Pdp/ProductSection";
import { getProduct } from "../api/Services/product";
import CartSection from "../../components/Pdp/CartSection";
import StoredProduct from "../../src/objects/StoredProduct";
import { getCategories } from "../api/Services/dashboard";
import SearchBar from "../../components/SearchBar/SearchBar";

class ProductPage extends React.Component<{
  product: StoredProduct;
  session;
  categories: string[];
}> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { product, session, categories } = this.props;
    return (
      <>
        <Layout title="Product page">
          <SearchBar categories={categories} category={null} />
          <ProductSection product={product} />
          <CartSection session={session} product={product} />
        </Layout>
      </>
    );
  }
}

export const getServerSideProps: GetServerSideProps = async ({ params, req }) => {
  const session = await getSession({ req });
  return {
    props: {
      product: await getProduct(params.id.toString(), session),
      categories: await getCategories(session),
      session,
    },
  };
};

export default ProductPage;
