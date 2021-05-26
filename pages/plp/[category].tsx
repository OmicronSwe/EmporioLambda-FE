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
    products?: StoredProduct[];
    category?: string;
    categories?: string[];
    error: boolean;
  },
  { session }
> {
  constructor(props) {
    super(props);
    this.state = { session: null };
  }

  componentDidMount = async () => {
    this.setState({ session: await getSession() });
  };

  render() {
    const { session } = this.state;
    const { products, category, categories, error } = this.props;

    // const categoryExists: boolean = categories.indexOf(category) !== -1;
    // categoryExists ? "Products in "+category : "Non-existent category"
    // categoryExists ? category : ""
    return (
      <>
        <Layout title={!error ? "Products in "+category+" category" : "Non-existent category"}>
          <h1 className="text-center mb-4">{!error ? category : ""}</h1>
          <SearchBarSection
            categories={categories}
            category={category}
            minPrice={undefined}
            maxPrice={undefined}
            name=""
          />
          <br />
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

  const categories: string[] = await getCategories(null);
  const category: string = decodeURI(params.category.toString());


  if(!categories.includes(category)){
    return {
      props: {
        category: category,
        error: true
      },
      revalidate: 60,
    };
  }
  return {
    props: {
      products: await getProductsByCategory(decodeURI(params.category.toString()), null),
      categories: categories,
      category:category,
      error: false
    },
    revalidate: 60,
  };
};

export default ProductListingPage;
