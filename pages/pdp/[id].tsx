import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";

import { getSession } from "next-auth/client";
import Layout from "../../components/layout";
import ProductSection from "../../components/Pdp/ProductSection";
import { getProduct } from "../../src/Services/product";
import CartSection from "../../components/Pdp/CartSection";
import StoredProduct from "../../src/types/StoredProduct";
import { getCategories, getProducts } from "../../src/Services/dashboard";
import SearchBarSection from "../../components/SearchBar/SearchBarSection";

class ProductPage extends React.Component<
  {
    product: StoredProduct;
    categories: string[];
  },
  { session }
> {
  constructor(props) {
    super(props);
    this.state = { session: null };
  }

  async componentDidMount() {
    this.setState({ session: await getSession() });
  }

  render() {
    const { product, categories } = this.props;
    const { session } = this.state;
    return (
      <>
        <Layout title="Product page">
          <SearchBarSection
            categories={categories}
            category={product.category}
            maxPrice={undefined}
            minPrice={undefined}
            name=""
          />
          <ProductSection product={product} />
          <CartSection session={session} product={product} />
        </Layout>
      </>
    );
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = await getProducts(null);

  const paths = categories.map((product) => ({
    params: { id: product.id },
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  return {
    props: {
      product: await getProduct(params.id.toString(), null),
      categories: await getCategories(null),
    },
    revalidate: 60,
  };
};

export default ProductPage;
