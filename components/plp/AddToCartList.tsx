import React from "react";
import { Button } from "react-bootstrap";

class AddToCartList extends React.Component<{ addToCartList }> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { addToCartList } = this.props;
    return (
      <>
        <Button variant="warning" onClick={() => addToCartList()} style={{ alignItems: "right"}}>
          Add to Cart
        </Button>
      </>
    );
  }
}
export default AddToCartList;