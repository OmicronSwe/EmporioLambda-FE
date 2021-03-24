import React from "react";
import { Button, CardColumns, Card } from "react-bootstrap";
import { Product } from "../../src/objects/Product";

class CategoryProductList extends React.Component<{
  products: Product[];
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
        <CardColumns>
          {products ? (
            products.map((item) => (
              <Card key={item.id}>
                {item.image ? <Card.Img src={item.image} /> : ""}
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Subtitle>{item.price}</Card.Subtitle>
                  <td>
                    <input
                      type="checkbox"
                      value="{{item.id}}"
                      onChange={() => toggleSelect(item.id)}
                    />
                  </td>
                  <Button variant="warning" onClick={() => addToCart(item.id)}>
                    Add to Cart
                  </Button>
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
