import { session } from "next-auth/client";
import React from "react";
import { Button, Form } from "react-bootstrap";
import { insertCart } from "../../pages/api/Services/product";

class CartSection extends React.Component<{ session; id: string }> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  addCart = async (event) => {
    // conversione parametri in stringJSON
    event.preventDefault();
    /*
    const stringJSON = JSON.stringify({
      name: event.target.productName.value,
      description: event.target.productDescription.value,
      price: event.target.productPrice.value,
      // image: event.target.productImage.value,
      category: event.target.productCategorySelection.value,
    });
    const prop = this.props; */
    // const result = await (await prop.insertProduct(stringJSON)).props.response;

    const { id } = this.props;
    await insertCart(session, id);
  };

  render() {
    return (
      <>
        <Form inline onSubmit={this.addCart}>
          <Form.Control as="select" className="addCart" id="inlineFormCustomSelectPref" custom>
            <option value="0">1</option>
            <option value="1">2</option>
            <option value="2">3</option>
            <option value="3">4</option>
          </Form.Control>
          <Button type="submit" className="add">
            Aggiungi al carrello
          </Button>
        </Form>
      </>
    );
  }
}

export default CartSection;
