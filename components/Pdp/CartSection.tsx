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

    const { id } = this.props;
    await insertCart(session, id, Number(event.target.quantity.value));
  };

  render() {
    return (
      <>
        <Form inline onSubmit={this.addCart}>
          <Form.Control as="select" className="addCart" id="inlineFormCustomSelectPref" name="quantity" custom>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
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
