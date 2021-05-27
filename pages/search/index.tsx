import React from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import Layout from "../../components/layout";
import StoredProduct from "../../src/types/StoredProduct";
import SearchBarSection from "../../components/SearchBar/SearchBarSection";
import { getCategories } from "../../src/Services/dashboard";
import SearchProductListingSection from "../../components/SearchBar/SearchProductListingSection";
import { getProductsFiltered } from "../../src/Services/product";

class SearchPage extends React.Component<{
  products: StoredProduct[];
  session;
  category: string;
  categories: string[];
  name: string;
  minPrice: number;
  maxPrice: number;
  categoryNotExists: boolean;
}> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { products, category, categories, session, minPrice, maxPrice, name } = this.props;
    return (
      <>
        <Layout title="Search results">
          <h1 className="text-center mb-4">Search Results</h1>
          <SearchBarSection
            categories={categories}
            category={category}
            minPrice={minPrice || undefined}
            maxPrice={maxPrice || undefined}
            name={name}
          />
          <br />
          <SearchProductListingSection products={products} session={session} />
        </Layout>
      </>
    );
  }
}

export const getServerSideProps: GetServerSideProps = async ({ query, req }) => {
  const session = await getSession({ req });

  const category = query.category ? decodeURI(String(query.category)) : null;
  const name = query.name ? decodeURI(String(query.name)) : null;
  const minPrice = query.minprice ? query.minprice : null;
  const maxPrice = query.maxprice ? query.maxprice : null;

  return {
    props: {
      products: await getProductsFiltered(name, category, minPrice, maxPrice, session),
      categories: await getCategories(session),
      category,
      name: name || "",
      minPrice,
      maxPrice,
      session,
    },
  };
};

export default SearchPage;
