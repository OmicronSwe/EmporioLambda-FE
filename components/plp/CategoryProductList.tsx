import Router from "next/router";
import React from "react";
import { Button, CardColumns, Card } from "react-bootstrap";
import StoredProduct from "../../src/types/StoredProduct";

class CategoryProductList extends React.Component<{
  products: StoredProduct[];
  addToCart;
  toggleSelect;
}> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { products, addToCart, toggleSelect } = this.props;
    return (
      <>
        
          {products ? (
            <CardColumns>{
            products.map((item) => (
              
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
