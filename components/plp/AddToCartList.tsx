import React from "react";
import { Button } from "react-bootstrap";

class AddToCartList extends React.Component<{ addToCartList; disabled: boolean }> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { addToCartList, disabled } = this.props;
    return (
      <>
        {!disabled && (
          <Button variant="warning" onClick={() => addToCartList()}>
            Add Selected to Cart
          </Button>
        )}
      </>
    );
  }
}
export default AddToCartList;
