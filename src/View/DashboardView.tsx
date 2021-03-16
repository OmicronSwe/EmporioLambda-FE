import React from "react";
import Layout from "../../components/layout";
import ProductSection from "../../components/Dashboard/ProductSection";
import CategorySection from "../../components/Dashboard/CategorySection";
import OrderSection from "../../components/Dashboard/OrderSection";

class DashboardView extends React.Component<{ products; insertProduct }> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { products, insertProduct } = this.props;
    return (
      <>
        <Layout title="Dashboard page">
          <ProductSection products={products} insertProduct={insertProduct} />
          <CategorySection />
          <OrderSection />
        </Layout>
      </>
    );
  }
}

export default DashboardView;
