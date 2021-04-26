import React from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import Layout from "../../components/layout";
import StoredProduct from "../../types/StoredProduct";
import { getProductsByCategory } from "../api/Services/plp";
import SearchBarSection from "../../components/SearchBar/SearchBarSection";
import { getCategories } from "../api/Services/dashboard";
import ListingSection from "../../components/plp/ListingSection";

class ProductListingPage extends React.Component<{
  products: StoredProduct[];
  session;
  category: string;
  categories: string[];
}> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { products, category, categories, session } = this.props;
    return (
      <>
        <Layout title="Category Products">
          <SearchBarSection
            categories={categories}
            category={category}
            minPrice={null}
            maxPrice={null}
            name=""
          />
          <ListingSection products={products} session={session} />
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
