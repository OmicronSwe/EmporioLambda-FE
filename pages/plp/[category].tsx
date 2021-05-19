import React from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import { getSession } from "next-auth/client";
import Layout from "../../components/layout";
import StoredProduct from "../../src/types/StoredProduct";
import { getProductsByCategory } from "../../src/Services/plp";
import SearchBarSection from "../../components/SearchBar/SearchBarSection";
import { getCategories } from "../../src/Services/dashboard";
import ListingSection from "../../components/plp/ListingSection";

class ProductListingPage extends React.Component<
  {
    products: StoredProduct[];
    category: string;
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
    const { session } = this.state;
    const { products, category, categories } = this.props;

    return (
      <>
        <Layout title="Category Products">
          <SearchBarSection
            categories={categories}
            category={category}
            minPrice={undefined}
            maxPrice={undefined}
            name=""
          />
          <ListingSection products={products} session={session} />
        </Layout>
      </>
    );
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = await getCategories(null);

  const paths = categories.map((category) => ({
    params: { category },
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  return {
    props: {
      products: await getProductsByCategory(decodeURI(params.category.toString()), null),
      categories: await getCategories(null),
      category: decodeURI(params.category.toString()),
    },
    revalidate: 60,
  };
};

export default ProductListingPage;
