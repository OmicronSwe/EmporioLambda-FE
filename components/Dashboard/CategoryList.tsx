import React from "react";
import { Button, CardColumns, Card } from "react-bootstrap";
import { Category } from "../../src/objects/Category";

class CategoryList extends React.Component<{ categories : Category[]; removeCategory }> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { categories, removeCategory } = this.props;
    return (
      <>
        <CardColumns>
          {categories ? (
            categories.map((item) => (
              <Card key={item.name}>
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Button variant="danger" onClick={() => removeCategory(item.name)}>
                    Remove
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
