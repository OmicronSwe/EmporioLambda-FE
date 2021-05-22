import React from "react";
import StoredProduct from "../../src/types/StoredProduct";
import { insertCartList } from "../../src/Services/plp";
import CategoryProductList from "./CategoryProductList";
import AddToCartList from "./AddToCartList";
import { insertCart } from "../../src/Services/product";

class ListingSection extends React.Component<
  { products: StoredProduct[]; session },
  {
    idProducts: string[];
    products: StoredProduct[];
    disabled: boolean;
    addedCartAlert: boolean;
    addedCartId: string;
    addedListAlert: boolean;
  }
> {
  constructor(props) {
    super(props);
    const { products } = this.props;
    this.state = {
      idProducts: [],
      products,
      disabled: true,
      addedCartAlert: null,
      addedCartId: null,
      addedListAlert: null,
    };
  }

  addToCart = async (id: string) => {
    const { session } = this.props;
    const result: boolean = await insertCart(session, id, 1);
    this.setState({ addedCartAlert: result, addedCartId: id });
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

    const result: boolean = await insertCartList(idProducts, session);
    this.setState({ addedListAlert: result });
  };

  render() {
    const { products, disabled, addedCartAlert, addedCartId, addedListAlert } = this.state;
    return (
      <>
        <div>
          <AddToCartList
            addToCartList={this.addToCartList}
            disabled={disabled}
            addedListAlert={addedListAlert}
          />
          <CategoryProductList
            products={products}
            addToCart={this.addToCart}
            toggleSelect={this.toggleSelect}
            addedCartAlert={addedCartAlert}
            addedCartId={addedCartId}
          />
        </div>
      </>
    );
  }
}

export default ListingSection;
