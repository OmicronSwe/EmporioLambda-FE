import React from "react";
import NewProductForm from "./NewProductForm";
import ProductList from "./ProductList";
import { Product } from "../../src/objects/Product";
import { Category } from "../../src/objects/Category";

import {
  insertProduct,
  removeProduct,
  getProducts
} from "../../pages/api/Services/dashboard";


class ProductSection extends React.Component<{ products: Product[]; categories: Category[] }, { products : Product[]; alert: boolean}> {
  constructor(props) {
    super(props);

    const { products} = this.props;
    this.state = { products: products, alert: null};
  }

  insertProduct = async (params) => {
    
    console.log(params);
    //let paramsJSON = JSON.parse(params);
    //console.log(paramsJSON);

    const res = await insertProduct(params);
    const prod = await getProducts();
    this.setState({ products: prod, alert: res });
  };

  removeProduct = async (id: string) => {
    await removeProduct(id);
    const prod = await getProducts();
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
