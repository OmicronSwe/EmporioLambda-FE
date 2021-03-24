import React from "react";
import NewProductForm from "./NewProductForm";
import ProductList from "./ProductList";
import { Product } from "../../src/objects/Product";
import { Category } from "../../src/objects/Category";

import { insertProduct, removeProduct, getProducts } from "../../pages/api/Services/dashboard";

class ProductSection extends React.Component<
  { products: Product[]; categories: Category[]; session },
  { products: Product[]; alert: boolean }
> {
  constructor(props) {
    super(props);

    const { products } = this.props;
    this.state = { products, alert: null };
  }

  insertProduct = async (params) => {
    const { session } = this.props;
    const res = await insertProduct(params, session);
    const prod = await getProducts(session);
    this.setState({ products: prod, alert: res });
  };

  removeProduct = async (id: string) => {
    const { session } = this.props;
    await removeProduct(id, session);
    const prod = await getProducts(session);
    this.setState({ products: prod });
  };

  render() {
    const { products, alert } = this.state;
    const { categories } = this.props;
    return (
      <>
        <h1>Product Section</h1>
        <NewProductForm insertProduct={this.insertProduct} categories={categories} alert={alert} />
        <ProductList products={products} removeProduct={this.removeProduct} />
      </>
    );
  }
}

export default ProductSection;
