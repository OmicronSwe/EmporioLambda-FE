import React from "react";
import { GetServerSideProps } from "next";

import Layout from "../../components/layout";
import ProductSection from "../../components/Dashboard/ProductSection";
import CategorySection from "../../components/Dashboard/CategorySection";
import OrderSection from "../../components/Dashboard/OrderSection";

import { getProducts, getCategories } from "../api/Services/dashboard";
import { Category } from "../../src/objects/Category";
import { Product } from "../../src/objects/Product";
import { getOrders } from "../api/Services/order";
import { Order } from "../../src/objects/Order";

class Dashboard extends React.Component<
  { products: Product[]; categories: Category[]; orders: Order[] },
  { categories: Category[] }
> {
  constructor(props) {
    super(props);

    const { categories } = this.props;
    this.state = { categories };
  }

  refreshOnCategoryChange = async () => {
    const categories = await getCategories();
    this.setState({ categories });
  };

  render() {
    const { products, orders } = this.props;
    const { categories } = this.state;
    return (
      <>
        <Layout title="Dashboard page">
          <ProductSection products={products} categories={categories} />
          <CategorySection
            categories={categories}
            refreshOnCategoryChange={this.refreshOnCategoryChange}
          />
          <OrderSection orders={orders} />
        </Layout>
      </>
    );
  }
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      products: await getProducts(),
      categories: await getCategories(),
      orders: await getOrders(),
    },
  };
};

export default Dashboard;
