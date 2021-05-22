import React from "react";
import { GetStaticProps } from "next";
import CategoryList from "../components/home/CategoryList";
import Layout from "../components/layout";
import { getCategories } from "../src/Services/dashboard";
import SearchBarSection from "../components/SearchBar/SearchBarSection";

class CategoryListHome extends React.Component<{ categories: string[] }> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { categories } = this.props;
    return (
      <>
        <Layout title="Homepage">
          <h1>Home</h1>
          <SearchBarSection
            categories={categories}
            category="All categories"
            minPrice={undefined}
            maxPrice={undefined}
            name=""
          />
          <CategoryList categories={categories} />
        </Layout>
      </>
    );
  }
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      categories: await getCategories(null),
    },
    revalidate: 60,
  };
};

export default CategoryListHome;
