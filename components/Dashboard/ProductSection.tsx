import React from "react";
import NewProductForm from "./NewProductForm";
import ProductList from "./ProductList";

import { insertProduct, removeProduct, getProducts, fileToBase64 } from "../../pages/api/Services/dashboard";

class ProductSection extends React.Component<{ products }, { products }> {
  constructor(props) {
    super(props);

    const { products } = this.props;
    this.state = { products };
  }

  insertProduct = async (params) => {/*
    let paramsJSON = JSON.parse(params);
    console.log(paramsJSON.image);
    const base64Image = await fileToBase64(paramsJSON.image);
    paramsJSON.image = base64Image;
    paramsJSON.image = {
      mime : "image/png",
      imageCode : base64Image
    }
    console.log(paramsJSON);
    //await insertProduct(JSON.stringify(paramsJSON));
    //const prod = await getProducts();
    //this.setState({ products: prod });*/
  };

  removeProduct = async (id: string) => {
    await removeProduct(id);
    const prod = await getProducts();
    this.setState({ products: prod });
  };

  render() {
    const { products } = this.state;
    return (
      <>
        <h1>Product Section</h1>
        <NewProductForm insertProduct={this.insertProduct} />
        <ProductList products={products} removeProduct={this.removeProduct} />
      </>
    );
  }
}

export default ProductSection;
