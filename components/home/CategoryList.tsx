import Router from "next/router";
import React from "react";
import { Button, CardColumns, Card } from "react-bootstrap";

class CategoryList extends React.Component<{ categories: string[] }> {
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
              <Card key={item}>
                <Card.Body>
                  <Card.Title>{item}</Card.Title>
                  <Button variant="danger" onClick={() => {
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
