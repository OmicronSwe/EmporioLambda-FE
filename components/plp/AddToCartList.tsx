import React from "react";
import { Alert, Button } from "react-bootstrap";

interface AddToCartListProps {
  addToCartList;
  disabled: boolean;
  addedListAlert: boolean;
}

const AddToCartList = ( { addToCartList, disabled, addedListAlert } : AddToCartListProps ) => {
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
export default AddToCartList;
