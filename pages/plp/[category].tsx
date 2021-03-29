import React from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import Layout from "../../components/layout";
import StoredProduct from "../../src/objects/StoredProduct";
import getProductsByCategory, { insertCart, insertCartList } from "../api/Services/plp";
import CategoryProductList from "../../components/plp/CategoryProductList";
import AddToCartList from "../../components/plp/AddToCartList";
import SearchBar from "../../components/SearchBar/SearchBar";
import { getCategories } from "../api/Services/dashboard";

class ProductListingPage extends React.Component<
  { products: StoredProduct[]; session; category: string; categories: string[] },
  { idProducts: string[]; products: StoredProduct[] }
> {
  constructor(props) {
    super(props);
    const { products } = this.props;
    this.state = { idProducts: [], products };
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

    this.setState({ idProducts });
  };

  addToCartList = async () => {
    const { session } = this.props;
    const { idProducts } = this.state;

    await insertCartList(idProducts, session);
  };

  render() {
    const { category, categories } = this.props;
    const { products } = this.state;
    return (
      <>
        <Layout title="Category Products">
          <SearchBar categories={categories} category={category} />
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
      products: await getProductsByCategory(decodeURI(params.category.toString()), session),
      categories: await getCategories(session),
      category: decodeURI(params.category.toString()),
      session,
    },
  };
};

export default ProductListingPage;
