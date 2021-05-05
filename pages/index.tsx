import React from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import CategoryList from "../components/home/CategoryList";
import Layout from "../components/layout";
import { getCategories } from "./api/Services/dashboard";
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
            minPrice={null}
            maxPrice={null}
            name=""
          />
          <CategoryList categories={categories} />
        </Layout>
      </>
    );
  }
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  return {
    props: {
      categories: await getCategories(session),
    },
  };
};

export default CategoryListHome;
