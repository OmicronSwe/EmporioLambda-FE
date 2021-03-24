import React from "react";
import { GetServerSideProps } from "next";
import Layout from "../../components/layout";
import { Product } from "../../src/objects/Product";
import getProductsByCategory from "../api/Services/product";
import CategoryProductList from "../../components/plp/CategoryProductList";
import { getSession } from "next-auth/client";

class ProductListingPage extends React.Component<{ products: Product[], session }> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  addCart = async (id) => {
    // conversione parametri in stringJSON
    const { session } = this.props;
    await insertCart(session, id, 1);
  };

  render() {
    const { products } = this.props;
    return (
      <>
        <Layout title="Category Products">
          <CategoryProductList products={products} addToCart={this.addToCart} />
        </Layout>
      </>
    );
  }
}

export const getServerSideProps: GetServerSideProps = async ({ params, req }) => {
  const session = await getSession({ req });
  
  return {
    props: {
      products: await getProductsByCategory(params.category.toString()),
      session: session
    },
  };
};

export default ProductListingPage;
