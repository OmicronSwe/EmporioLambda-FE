import React from "react";
import NewProductForm from "./NewProductForm";
import ProductList from "./ProductList";

class ProductSection extends React.Component<{ products; insertProduct }> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { products, insertProduct } = this.props;
    return (
      <>
        <h1>Product Section</h1>
        <NewProductForm insertProduct={insertProduct} />
        <ProductList products={products} />
      </>
    );
  }
}

export default ProductSection;
