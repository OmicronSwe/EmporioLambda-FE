import React from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import Layout from "../../components/layout";
import { Product } from "../../src/objects/Product";
import getProductsByCategory, {
  filterByPrice,
  insertCart,
  insertCartList,
} from "../api/Services/plp";
import CategoryProductList from "../../components/plp/CategoryProductList";
import AddToCartList from "../../components/plp/AddToCartList";
import FilterByPrice from "../../components/plp/FilterByPrice";

class ProductListingPage extends React.Component<
  { products: Product[]; session; category: string },
  { idProducts: string[]; products: Product[] }
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

    console.log(idProducts);
    this.setState({ idProducts });
  };

  addToCartList = async () => {
    const { session } = this.props;
    const { idProducts } = this.state;

    await insertCartList(idProducts, session);
  };

  filterByPrice = async (event) => {
    event.preventDefault();
    const { category, session } = this.props;
    const products = await filterByPrice(
      category,
      session,
      event.target.PriceMin.value ? event.target.PriceMin.value : 0,
      event.target.PriceMax.value ? event.target.PriceMax.value : -1
    );

    this.setState({ products });
  };

  render() {
    const { products } = this.state;
    return (
      <>
        <Layout title="Category Products">
          <AddToCartList addToCartList={this.addToCartList} />
          <FilterByPrice filterByPrice={this.filterByPrice} />
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
      category: await decodeURI(params.category.toString()),
      session,
    },
  };
};

export default ProductListingPage;
