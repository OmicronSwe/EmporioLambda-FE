import Router from "next/router";
import React from "react";
import { Button, CardColumns, Card, Alert } from "react-bootstrap";
import StoredProduct from "../../src/types/StoredProduct";

class CategoryProductList extends React.Component<{
  products: StoredProduct[];
  addToCart;
  toggleSelect;
  addedCartAlert: boolean;
  addedCartId: string;
}> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { products, addToCart, toggleSelect, addedCartAlert, addedCartId } = this.props;
    return (
      <>
        {products ? (
          <CardColumns>
            {products.map((item) => (
              <Card key={item.id}>
                {item.imageUrl ? <Card.Img src={item.imageUrl} /> : ""}
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Subtitle>{item.price}</Card.Subtitle>
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
                  <Button variant="warning" onClick={() => addToCart(item.id)}>
                    Add to Cart
                  </Button>
                  {item.id === addedCartId && addedCartAlert !== null && addedCartAlert === true && (
                    <Alert variant="success">
                      <Alert.Heading className="text-center">
                        Product added successfully!
                      </Alert.Heading>
                    </Alert>
                  )}
                  {item.id === addedCartId && addedCartAlert !== null && addedCartAlert === false && (
                    <Alert variant="danger">
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
          <h2>No products found</h2>
        )}
      </>
    );
  }
}

export default CategoryProductList;
