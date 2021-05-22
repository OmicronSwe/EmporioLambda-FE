import React from "react";
import { Alert, Button } from "react-bootstrap";

class AddToCartList extends React.Component<{
  addToCartList;
  disabled: boolean;
  addedListAlert: boolean;
}> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { addToCartList, disabled, addedListAlert } = this.props;
    return (
      <>
        {!disabled && (
          <Button variant="warning" onClick={() => addToCartList()}>
            Add Selected to Cart
          </Button>
        )}
        {addedListAlert !== null && addedListAlert === true && (
          <Alert variant="success">
            <Alert.Heading className="text-center">Products added successfully!</Alert.Heading>
          </Alert>
        )}
        {addedListAlert !== null && addedListAlert === false && (
          <Alert variant="danger">
            <Alert.Heading className="text-center">
              Error occured while adding the products
            </Alert.Heading>
          </Alert>
        )}
      </>
    );
  }
}
export default AddToCartList;
