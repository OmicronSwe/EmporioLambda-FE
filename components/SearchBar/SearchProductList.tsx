import Router from "next/router";
import React, { useState } from "react";
import { Button, CardColumns, Card, Alert } from "react-bootstrap";
import StoredProduct from "../../src/types/StoredProduct";

interface SearchProductListProps {
  products: StoredProduct[];
  addToCart;
  toggleSelect;
  addedCartAlert: boolean;
  addedCartId: string;
}

const SearchProductList = ({
  products,
  addToCart,
  toggleSelect,
  addedCartAlert,
  addedCartId,
}: SearchProductListProps) => {
  const [show, setShow] = useState(true);
  return (
    <>
      {products ? (
        <CardColumns>
          {products.map((item) => (
            <Card key={item.id}>
              {item.imageUrl ? <Card.Img src={item.imageUrl} /> : ""}
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Subtitle>{`${item.price.toFixed(2)}€`}</Card.Subtitle>
                <input
                  className="insertListCheckbox"
                  type="checkbox"
                  value="{{item.id}}"
                  onChange={() => toggleSelect(item.id)}
                />
                <br />
                <Button
                  variant="primary"
                  onClick={() => {
                    Router.push(`/pdp/${item.id}`);
                  }}
                >
                  View Product
                </Button>
                <Button
                  variant="warning"
                  onClick={() => {
                    addToCart(item.id);
                    setShow(true);
                  }}
                >
                  Add to Cart
                </Button>
                {item.id === addedCartId && addedCartAlert !== null && addedCartAlert === true && (
                  <Alert variant="success" show={show} onClose={() => setShow(false)} dismissible>
                    <Alert.Heading className="text-center">
                      Product added successfully!
                    </Alert.Heading>
                  </Alert>
                )}
                {item.id === addedCartId && addedCartAlert !== null && addedCartAlert === false && (
                  <Alert variant="danger" show={show} onClose={() => setShow(false)} dismissible>
                    <Alert.Heading className="text-center">
                      Error occured while adding the product
                    </Alert.Heading>
                  </Alert>
                )}
              </Card.Body>
            </Card>
          ))}
        </CardColumns>
      ) : (
        <div>
          <h3 className="text-center pt-4">Products not found!</h3>
          <h6 className="text-center pt-2">Please try again using the search bar</h6>
          <h6 className="text-center pt-2">or selecting a category from the homepage</h6>
        </div>
      )}
    </>
  );
};

export default SearchProductList;
