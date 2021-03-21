import React from "react";
import { GetServerSideProps } from "next";

import Layout from "../../components/layout";

import { Product } from "../../src/objects/Product";
import { getProductsByCategory } from "../api/Services/plp";
import CategoryProductList from "../../components/plp/CategoryProductList";


class ProductListingPage extends React.Component<{ products: Product[] }> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  testFunzione=async () => { const products= await getProductsByCategory('test4') 
    return products.values}products= await getProductsByCategory('test4')

  render() {
    //const { products } = this.props;
    const products= this.testFunzione()
    return (
      <>
        <Layout title="Category Products">
          <CategoryProductList products={products} />
        </Layout>
      </>
    );
  }
}

/*
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  return {
    props: {
      products: await getProductsByCategory(params.category.toString())
    },
  };
};
*/

export default ProductListingPage;
