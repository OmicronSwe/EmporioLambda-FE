import React from "react";
import { GetServerSideProps } from "next";

import { getSession, Session } from "next-auth/client";
import Layout from "../../components/layout";
import ProductSection from "../../components/Dashboard/ProductSection";
import CategorySection from "../../components/Dashboard/CategorySection";
import OrderSection from "../../components/Dashboard/OrderSection";
import DashboardLinks from "../../components/Dashboard/DashboardLinks";

import { getProducts, getCategories } from "../../src/Services/dashboard";
import { getOrders } from "../../src/Services/order";
import Order from "../../src/types/Order";
import StoredProduct from "../../src/types/StoredProduct";
import { getTax } from "../../src/Services/product";
import TaxSection from "../../components/Dashboard/TaxSection";

class Dashboard extends React.Component<
  { products: StoredProduct[]; categories: string[]; orders: Order[]; tax: number; session },
  { categories: string[] }
> {
  constructor(props) {
    super(props);

    const { categories } = this.props;
    this.state = { categories };
  }

  refreshOnCategoryChange = async () => {
    const { session } = this.props;
    const categories = await getCategories(session);
    this.setState({ categories });
  };

  render() {
    const { products, orders, session, tax } = this.props;
    const { categories } = this.state;
    return (
      <>
        <Layout title="Dashboard page">
          <ProductSection products={products} categories={categories} session={session} />
          <CategorySection
            categories={categories}
            refreshOnCategoryChange={this.refreshOnCategoryChange}
            session={session}
          />
          <TaxSection tax={tax} session={session} />
          <OrderSection orders={orders} />
          <DashboardLinks />
        </Layout>
      </>
    );
  }
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session: Session = await getSession({ req });

  if (!session?.adm) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      products: await getProducts(session),
      categories: await getCategories(session),
      orders: await getOrders(session),
      tax: await getTax(session),
      session,
    },
  };
};

export default Dashboard;
