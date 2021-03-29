import React from "react";
import { GetServerSideProps } from "next";
import CategoryList from "../components/home/CategoryList";
import Layout from "../components/layout";
import { getCategories } from "./api/Services/dashboard";
import { getSession } from "next-auth/client";
import SearchBar from "../components/SearchBar/SearchBar";



class CategoryListHome extends React.Component<
  { categories: string[] }
> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { categories } = this.props;
    return (
      <>
        <Layout title="Homepage">
          <SearchBar categories={categories} category={"All categories"}/>
          <CategoryList
            categories={categories}
          />
        </Layout>
      </>
    );
  }
}

export const getServerSideProps: GetServerSideProps = async ({req}) => {
  const session = await getSession({ req });
  return {
    props: {
      categories: await getCategories(session)
    },
  };
};

export default CategoryListHome;



