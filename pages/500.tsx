import Link from "next/link";
import { GetStaticProps } from "next";
import SearchBarSection from "../components/SearchBar/SearchBarSection";
import { getCategories } from "../src/Services/dashboard";
import Layout from "../components/layout";

interface Custom500Props {
  categories: string[];
}

const Custom500 = ({ categories }: Custom500Props) => {
  return (
    <>
      <Layout title="Error 500">
        <h1 className="text-center">Oooops</h1>
        <h2 className="text-center pb-5">A Server-side error occurred</h2>
        <h4>
          Go back to the
          <Link href="/"> Homepage </Link>
          ...
        </h4>
        <h4 className="text-center">... Or you can search the website:</h4>
        <SearchBarSection
          categories={categories}
          category="All categories"
          minPrice={undefined}
          maxPrice={undefined}
          name=""
        />
      </Layout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      categories: await getCategories(null),
    },
    revalidate: 60,
  };
};

export default Custom500;
