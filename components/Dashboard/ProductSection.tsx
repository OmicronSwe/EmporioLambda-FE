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
  { products: StoredProduct[]; productInserted: boolean; errors }
> {
  constructor(props) {
    super(props);

    const { products } = this.props;
    this.state = { products, productInserted: false, errors: {} };
  }

  formValidation = (name: string, description: string, price: string, image: ProductImage) => {
    let isValid: boolean = true;
    const errors = {};
    if (name === "") {
      errors["productNameError"] = "The name can't be empty";
      isValid = false;
    }
    if (description === "") {
      errors["productDescriptionError"] = "The description can't be empty";
      isValid = false;
    }
    if (price === "") {
      errors["productPriceError"] = "The price can't be empty";
      isValid = false;
    }
    if (Number.isNaN(Number(price)) || Number(price) < 0) {
      errors["productPriceError"] = "The price must be a positive number";
      isValid = false;
    }
    if (image === undefined) {
      errors["productImageError"] = "An image must be uploaded";
      isValid = false;
    }

    this.setState({ errors });

    return isValid;
  };

  insertProduct = async (event) => {
    event.preventDefault();
    const { session } = this.props;

    // Form parameters extraction
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

    // VALIDATION
    const isValid: boolean = this.formValidation(name, description, price, image);

    if (isValid) {
      const product: ProductSend = new ProductSend(
        name,
        description,
        image,
        Number(price),
        category
      );
      await insertProduct(product, session);
      const updatedProducts = await getProducts(session);
      this.setState({ products: updatedProducts, productInserted: true });
    }
  };

  removeProduct = async (id: string) => {
    // TODO: aggiunta alert di avvenuta cancellazione
    const { session } = this.props;
    await removeProduct(id, session);
    const prod = await getProducts(session);
    this.setState({ products: prod });
  };

  render() {
    const { products, productInserted, errors } = this.state;
    const { categories } = this.props;
    return (
      <>
        <h1>Product Section</h1>
        <NewProductForm
          insertProduct={this.insertProduct}
          categories={categories}
          productInserted={productInserted}
          errors={errors}
        />
        <ProductList products={products} removeProduct={this.removeProduct} />
      </>
    );
  }
}

export default ProductSection;
