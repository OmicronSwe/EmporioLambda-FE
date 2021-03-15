import React from "react";
import ProductList from "./ProductList";

class ProductSection extends React.Component<{ products }> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { products } = this.props;
    return <ProductList products={products} />;
  }
}

export default ProductSection;
