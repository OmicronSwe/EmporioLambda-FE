import React from "react";
import { GetServerSideProps } from "next";

import { getSession } from "next-auth/client";
import Layout from "../../components/layout";
import ProductSection from "../../components/Pdp/ProductSection";
import { getProduct } from "../../src/Services/product";
import CartSection from "../../components/Pdp/CartSection";
import StoredProduct from "../../src/types/StoredProduct";
import { getCategories } from "../../src/Services/dashboard";
import SearchBarSection from "../../components/SearchBar/SearchBarSection";

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

export const getStaticSideProps: GetServerSideProps = async ({ params, req }) => {
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
