import Router from "next/router";
import React from "react";
import { Button, CardColumns, Card } from "react-bootstrap";
import { Category } from "../../src/objects/Category";

class CategoryList extends React.Component<{ categories: Category[] }> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { categories } = this.props;
    return (
      <>
        <CardColumns>
          {categories ? (
            categories.map((item) => (
              <Card key={item.name}>
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Button variant="danger" onClick={() => {
                      Router.push(`/plp/${item.name}`);
                    }}>
                    View Products
                  </Button>
                </Card.Body>
              </Card>
            ))
          ) : (
            <p>No category found</p>
          )}
        </CardColumns>
      </>
    );
  }
}

export default CategoryList;
