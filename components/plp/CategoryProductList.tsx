import Router from "next/router";
import React from "react";
import { Button, CardColumns, Card } from "react-bootstrap";
import { getProducts } from "../../pages/api/Services/dashboard";
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
              <Card key={item.id} onClick={() => getProducts()}>
                {item.imageUrl ? <Card.Img src={item.imageUrl} /> : ""}
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
                  <Button
                    variant="warning"
                    onClick={() => {
                      Router.push(`/pdp/${item.id}`);
                    }}
                    style={{ alignItems: "left" }}
                  >
                    View Product
                  </Button>
                  <Button
                    variant="warning"
                    onClick={() => addToCart(item.id)}
                    style={{ alignItems: "right" }}
                  >
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