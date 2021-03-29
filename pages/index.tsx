import React from "react";
import { GetServerSideProps } from "next";
import CategorySection from "../components/plp/CategorySection";
import Layout from "../components/layout";
import { Category } from "../src/objects/Category";
import { getCategories } from "./api/Services/dashboard";



class CategoryListHome extends React.Component<
  { categories: Category[] },
  { categories: Category[] }
> {
  constructor(props) {
    super(props);

    const { categories } = this.props;
    this.state = { categories };
  }

  refreshOnCategoryChange = async () => {
    const categories = await getCategories;
    this.setState({ categories });
  };

  render() {
    const { categories } = this.state;
    return (
      <>
        <Layout title="Category List">
          <CategorySection
            categories={categories}
            refreshOnCategoryChange={this.refreshOnCategoryChange}
          />
        </Layout>
      </>
    );
  }
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      categories: await getCategories()
    },
  };
};

export default CategoryListHome;



