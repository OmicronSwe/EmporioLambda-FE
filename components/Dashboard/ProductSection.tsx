import React from "react";
import NewProductForm from "./NewProductForm";
import ProductList from "./ProductList";
import ProductImage from "../../src/types/RawImage";
import {
  fileToBase64,
  insertProduct,
  removeProduct,
  getProducts,
} from "../../src/Services/dashboard";

import StoredProduct from "../../src/types/StoredProduct";
import ProductSend from "../../src/types/ProductSend";

class ProductSection extends React.Component<
  { products: StoredProduct[]; categories: string[]; session },
  { products: StoredProduct[]; productInsertedAlert: boolean | null }
> {
  constructor(props) {
    super(props);

    const { products } = this.props;
    this.state = { products, productInsertedAlert: null };
  }

  insertProduct = async (event) => {
    event.preventDefault();
    const { session } = this.props;

    // TODO: validation

    const fileObject = event.target.productImage.files[0];
    let base64StringImage: string = "";
    if (fileObject) {
      base64StringImage = await fileToBase64(fileObject);
    }

    const name: string = event.target.productName.value ? event.target.productName.value : "";
    const description: string = event.target.productDescription.value
      ? event.target.productDescription.value
      : "";
    const price: string = event.target.productPrice.value ? event.target.productPrice.value : "";
    const image: ProductImage =
      base64StringImage !== ""
        ? new ProductImage(fileObject.type, `base64,${base64StringImage}`)
        : undefined;
    const category: string = event.target.productCategorySelection.value
      ? event.target.productCategorySelection.value
      : "";

    const allInfoInserted: boolean =
      name !== "" && description !== "" && price !== "" && image !== undefined && category !== "";

    if (allInfoInserted) {
      const product: ProductSend = new ProductSend(
        name,
        description,
        image,
        Number(price),
        category
      );
      await insertProduct(product, session);
      const updatedProducts = await getProducts(session);
      this.setState({ products: updatedProducts, productInsertedAlert: allInfoInserted });
    } else {
      this.setState({ productInsertedAlert: allInfoInserted });
    }
  };

  removeProduct = async (id: string) => {
    const { session } = this.props;
    await removeProduct(id, session);
    const prod = await getProducts(session);
    this.setState({ products: prod });
  };

  render() {
    const { products, productInsertedAlert } = this.state;
    const { categories } = this.props;
    return (
      <>
        <h1>Product Section</h1>
        <NewProductForm
          insertProduct={this.insertProduct}
          categories={categories}
          productInsertedAlert={productInsertedAlert}
        />
        <ProductList products={products} removeProduct={this.removeProduct} />
      </>
    );
  }
}

export default ProductSection;
