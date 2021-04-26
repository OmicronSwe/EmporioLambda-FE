import React from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import Layout from "../../components/layout";
import StoredProduct from "../../types/StoredProduct";
import SearchBarSection from "../../components/SearchBar/SearchBarSection";
import { getCategories } from "../api/Services/dashboard";
import ListingSection from "../../components/plp/ListingSection";
import { getProductsFiltered } from "../api/Services/product";

class SearchPage extends React.Component<{
  products: StoredProduct[];
  session;
  category: string;
  categories: string[];
  name: string;
  minPrice: number;
  maxPrice: number;
}> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { products, category, categories, session, minPrice, maxPrice, name } = this.props;
    return (
      <>
        <Layout title="Category Products">
          <SearchBarSection
            categories={categories}
            category={category}
            minPrice={minPrice}
            maxPrice={maxPrice}
            name={name}
          />
          <ListingSection products={products} session={session} />
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
