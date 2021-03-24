import React from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import Layout from "../../components/layout";
import { Product } from "../../src/objects/Product";
import getProductsByCategory, { insertCart, insertCartList } from "../api/Services/plp";
import CategoryProductList from "../../components/plp/CategoryProductList";
import AddToCartList from "../../components/plp/AddToCartList";

class ProductListingPage extends React.Component<
  { products: Product[]; session },
  { idProducts: string[] }
> {
  constructor(props) {
    super(props);
    this.state = { idProducts: [] };
  }

  addToCart = async (id: string) => {
    const { session } = this.props;
    await insertCart(id, session);
  };

  toggleSelect = async (id: string) => {
    const { idProducts } = this.state;
    const index = idProducts.indexOf(id);
    if (index !== -1) idProducts.splice(index, 1);
    else idProducts.push(id);

    console.log(idProducts);
    this.setState({ idProducts });
  };

  addToCartList = async () => {
    const { session } = this.props;
    const { idProducts } = this.state;

    await insertCartList(idProducts, session);
  };

  render() {
    const { products } = this.props;
    return (
      <>
        <Layout title="Category Products">
          <AddToCartList addToCartList={this.addToCartList} />
          <CategoryProductList
            products={products}
            addToCart={this.addToCart}
            toggleSelect={this.toggleSelect}
          />
        </Layout>
      </>
    );
  }
}

export const getServerSideProps: GetServerSideProps = async ({ params, req }) => {
  const session = await getSession({ req });

  return {
    props: {
      products: await getProductsByCategory(params.category.toString(), session),
      session,
    },
  };
};

export default ProductListingPage;
