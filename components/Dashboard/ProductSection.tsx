import React from "react";
import NewProductForm from "./NewProductForm";
import ProductList from "./ProductList";
import { Product } from "../../src/objects/Product";
import { ProductImage } from "../../src/objects/ProductImage";
import { Category } from "../../src/objects/Category";
import { fileToBase64 } from "../../pages/api/Services/dashboard";
import { insertProduct, removeProduct, getProducts } from "../../pages/api/Services/dashboard";

class ProductSection extends React.Component<
  { products: Product[]; categories: Category[] },
  { products: Product[]; productInsertedAlert: boolean | null }
> {
  constructor(props) {
    super(props);

    const { products } = this.props;
    this.state = { products, productInsertedAlert: null };
  }

  insertProduct = async (event) => {

    event.preventDefault();

    // TODO: validation

    const fileObject = event.target.productImage.files[0];
    const base64StringImage: string = await fileToBase64(fileObject);
    
    const name: string = event.target.productName.value;
    const description: string = event.target.productDescription.value;
    const price: string = event.target.productPrice.value;
    const image: ProductImage = new ProductImage(fileObject.type, `base64,${base64StringImage}`);
    const category: Category = new Category(event.target.productCategorySelection.value);

    const product: Product = new Product(null,name,description,image,price,category);
    console.log(product);
    const res = await insertProduct(product);
    const prod = await getProducts();
    this.setState({ products: prod, productInsertedAlert: res });
  };

  removeProduct = async (id: string) => {
    await removeProduct(id);
    const prod = await getProducts();
    this.setState({ products: prod });
  };

  render() {
    const { products, productInsertedAlert } = this.state;
    const { categories } = this.props;
    return (
      <>
        <h1>Product Section</h1>
        <NewProductForm insertProduct={this.insertProduct} categories={categories} productInsertedAlert={productInsertedAlert} />
        <ProductList products={products} removeProduct={this.removeProduct} />
      </>
    );
  }
}

export default ProductSection;
