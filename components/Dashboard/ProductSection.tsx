import React from "react";
import NewProductForm from "./NewProductForm";
import ProductList from "./ProductList";
import ProductImage from "../../src/objects/ProductImage";
import { Category } from "../../src/objects/Category";
import {
  fileToBase64,
  insertProduct,
  removeProduct,
  getProducts,
} from "../../pages/api/Services/dashboard";

// import Product  from "../../src/objects/Product";
import StoredProduct from "../../src/objects/StoredProduct";
import JustCreatedProduct from "../../src/objects/JustCreatedProduct";

class ProductSection extends React.Component<
  { products: StoredProduct[]; categories: Category[]; session },
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
    const base64StringImage: string = await fileToBase64(fileObject);

    const name: string = event.target.productName.value;
    const description: string = event.target.productDescription.value;
    const price: string = event.target.productPrice.value;
    const image: ProductImage = new ProductImage(fileObject.type, `base64,${base64StringImage}`);
    const category: string = event.target.productCategorySelection.value;

    const product: JustCreatedProduct = new JustCreatedProduct(
      name,
      description,
      image,
      price,
      category
    );
    const res = await insertProduct(product, session);
    const prod = await getProducts(session);
    this.setState({ products: prod, productInsertedAlert: res });
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
