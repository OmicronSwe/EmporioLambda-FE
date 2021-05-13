import Router from "next/router";
import React from "react";
import { Alert, Button, CardColumns, Card } from "react-bootstrap";
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
              <Card>
                <Card.Body>
                  <Card.Title>{item}</Card.Title>
                  <Button variant="primary" onClick={() => {
                      Router.push(`/plp/${item}`);
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
