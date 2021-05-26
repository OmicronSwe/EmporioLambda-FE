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
    categoryNotExists: boolean;
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
    const { products, category, categories, categoryNotExists } = this.props;

    return (
      <>
        <Layout title={!categoryNotExists ? `Products in ${category} category` : "Non-existent category"}>
          <h1 className="text-center mb-4">{!categoryNotExists ? category : ""}</h1>
          <SearchBarSection
            categories={categories}
            category={category}
            minPrice={undefined}
            maxPrice={undefined}
            name=""
          />
          <br />
          <ListingSection products={products} session={session} categoryNotExists={categoryNotExists} />
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

  if (!categories.includes(category)) {
    return {
      props: {
        category,
        categoryNotExists: true,
      },
      revalidate: 60,
    };
  }
  return {
    props: {
      products: await getProductsByCategory(decodeURI(params.category.toString()), null),
      categories,
      category,
      categoryNotExists: false,
    },
    revalidate: 60,
  };
};

export default ProductListingPage;
