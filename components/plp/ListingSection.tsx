import React from "react";
import StoredProduct from "../../types/StoredProduct";
import { insertCart, insertCartList } from "../../pages/api/Services/plp";
import CategoryProductList from "./CategoryProductList";
import AddToCartList from "./AddToCartList";

class ListingSection extends React.Component<
  { products: StoredProduct[]; session },
  { idProducts: string[]; products: StoredProduct[]; disabled: boolean }
> {
  constructor(props) {
    super(props);
    const { products } = this.props;
    this.state = { idProducts: [], products, disabled: true };
  }

  addToCart = async (id: string) => {
    const { session } = this.props;
    await insertCart(id, session);
  };

  toggleSelect = async (id: string) => {
    const { idProducts } = this.state;
    const index = idProducts.indexOf(id);
    if (index !== -1) idProducts.splice(index, 1);
    else idProducts.push(id);

    this.setState({ idProducts, disabled: idProducts.length === 0 });
  };

  addToCartList = async () => {
    const { session } = this.props;
    const { idProducts } = this.state;

    await insertCartList(idProducts, session);
  };

  render() {
    const { products, disabled } = this.state;
    return (
      <>
        <div>
          <AddToCartList addToCartList={this.addToCartList} disabled={disabled} />
          <CategoryProductList
            products={products}
            addToCart={this.addToCart}
            toggleSelect={this.toggleSelect}
          />
        </div>
      </>
    );
  }
}

export default ListingSection;
