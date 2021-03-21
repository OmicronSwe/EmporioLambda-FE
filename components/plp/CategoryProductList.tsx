import React from "react";
import { Button, CardColumns, Card } from "react-bootstrap";
import { Product } from "../../src/objects/Product";

class CategoryProductList extends React.Component<{ products: Product[] }> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { products } = this.props;
    return (
      <>
        <CardColumns>
          {products ? (
            products.map((item) => (
              <Card key={item.id}>
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Button variant="warning">Add to Cart</Button>
                </Card.Body>
              </Card>
            ))
          ) : (
            <p>No product found</p>
          )}
        </CardColumns>
      </>
    );
  }
}

export default CategoryProductList;
