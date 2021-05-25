import React, { useState } from "react";
import { Alert, Button } from "react-bootstrap";

interface AddToCartListProps {
  addToCartList;
  disabled: boolean;
  addedListAlert: boolean;
}

const AddToCartList = ({ addToCartList, disabled, addedListAlert }: AddToCartListProps) => {
  const [show, setShow] = useState(true);
  return (
    <>
      {!disabled && (
        <Button
          variant="warning"
          onClick={() => {
            addToCartList();
            setShow(true);
          }}
        >
          Add Selected to Cart
        </Button>
      )}
      {addedListAlert !== null && addedListAlert === true && (
        <Alert variant="success" show={show} onClose={() => setShow(false)} dismissible>
          <Alert.Heading className="text-center">Products added successfully!</Alert.Heading>
        </Alert>
      )}
      {addedListAlert !== null && addedListAlert === false && (
        <Alert variant="danger" show={show} onClose={() => setShow(false)} dismissible>
          <Alert.Heading className="text-center">
            Error occured while adding the products
          </Alert.Heading>
        </Alert>
      )}
    </>
  );
};
export default AddToCartList;
