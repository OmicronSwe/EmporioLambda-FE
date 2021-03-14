import React from "react";
import Layout from "../../components/layout";
import ProductSection from "../../components/Dashboard/ProductSection";
import CategorySection from "../../components/Dashboard/CategorySection";
import OrderSection from "../../components/Dashboard/OrderSection";

class DashboardView extends React.Component<{products}> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <Layout title="Dashboard page">
          <ProductSection products={this.props.products} />
          <CategorySection />
          <OrderSection />
        </Layout>
      </>
    );
  }
}

export default DashboardView;
