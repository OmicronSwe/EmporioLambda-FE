import React from "react";
import { Button, CardColumns, Card } from "react-bootstrap";

class CategoryList extends React.Component<{ categories: string[]; removeCategory }> {
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
              <Card key={item}>
                <Card.Body>
                  <Card.Title>{item}</Card.Title>
                  <Button variant="danger" onClick={() => removeCategory(item)}>
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
