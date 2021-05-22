import SearchBarSection from "../components/SearchBar/SearchBarSection";
import Link from "next/link";
import { GetStaticProps } from "next";
import { getCategories } from "../src/Services/dashboard";
import Layout from "../components/layout";

interface Custom404Props {
    categories: string[];
  }

const Custom404 = ( { categories }: Custom404Props ) => {
    return (
        <>
            <Layout title="Error 404">
                <h1 className="text-center">Oooops</h1>
                <h2 className="text-center pb-5">That page cannot be found!</h2>
                <h4>Go back to the <Link href="/"><a>Homepage</a></Link> ...</h4>
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
    )
}

export const getStaticProps: GetStaticProps = async () => {
    return {
      props: {
        categories: await getCategories(null),
      },
      revalidate: 60,
    };
};

export default Custom404;