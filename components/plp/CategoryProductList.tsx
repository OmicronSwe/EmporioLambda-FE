import Router from "next/router";
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
    return (products ?(
      <>
        <CardColumns>
          {products ? (
            products.map((item) => (
              <Card key={item.id}>
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
                    variant="primary"
                    onClick={() => {
                      Router.push(`/pdp/${item.id}`);
                    }}
                  >
                    View Product
                  </Button>
                  <Button
                    variant="warning"
                    onClick={() => addToCart(item.id)}
                  >
                    Add to Cart
                  </Button>
                </Card.Body>
              </Card>
            ))
          ) : (<p></p>)
          }
        </CardColumns>
      </>
    ) :
      (<p>No product found</p>)
    );
  }
}

export default CategoryProductList;