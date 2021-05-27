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
  {
    products: StoredProduct[];
    isProductInserted: boolean | null;
    isProductDeleted: boolean | null;
    productDeletedId: string;
    errors: Map<string, string>;
  }
> {
  constructor(props) {
    super(props);

    const { products } = this.props;
    this.state = {
      products,
      isProductInserted: null,
      isProductDeleted: null,
      productDeletedId: "",
      errors: new Map<string, string>(),
    };
  }

  formValidation = (
    name: string,
    description: string,
    price: string,
    image: ProductImage,
    category: string
  ) => {
    let isValid: boolean = true;
    const updatedErrors: Map<string, string> = new Map<string, string>();
    if (name === "") {
      updatedErrors.set("productNameError", "The name can't be empty");
      isValid = false;
    }
    if (description === "") {
      updatedErrors.set("productDescriptionError", "The description can't be empty");
      isValid = false;
    }
    if (price === "") {
      updatedErrors.set("productPriceError", "The price can't be empty");
      isValid = false;
    }
    if (Number.isNaN(Number(price)) || Number(price) < 0) {
      updatedErrors.set("productPriceError", "The price must be a positive number");
      isValid = false;
    }
    if (image === undefined) {
      updatedErrors.set("productImageError", "An image must be uploaded");
      isValid = false;
    }
    if (category === "") {
      updatedErrors.set("productCategoryError", "A valid category must be selected");
      isValid = false;
    }

    this.setState({ errors: updatedErrors });

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
    const category: string =
      event.target.productCategorySelection.value !== "Choose..."
        ? event.target.productCategorySelection.value
        : "";

    // Validation
    const isValid: boolean = this.formValidation(name, description, price, image, category);

    if (isValid) {
      const product: ProductSend = new ProductSend(
        name,
        description,
        image,
        Number(price),
        category
      );
      const inserted: boolean = await insertProduct(product, session);
      const updatedProducts = await getProducts(session);
      this.setState({ products: updatedProducts, isProductInserted: inserted });
    }
  };

  removeProduct = async (id: string) => {
    const { session } = this.props;
    const removed: boolean = await removeProduct(id, session);
    this.setState({ isProductDeleted: removed, productDeletedId: id });
  };

  render() {
    const { products, isProductInserted, isProductDeleted, productDeletedId, errors } = this.state;
    const { categories } = this.props;
    return (
      <>
        <h1 className="text-center mb-3">Product Section</h1>
        <NewProductForm
          insertProduct={this.insertProduct}
          categories={categories}
          isProductInserted={isProductInserted}
          errors={errors}
        />
        <ProductList
          products={products}
          removeProduct={this.removeProduct}
          isProductDeleted={isProductDeleted}
          productDeletedId={productDeletedId}
        />
      </>
    );
  }
}

export default ProductSection;
