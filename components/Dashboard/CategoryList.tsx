import React from "react";
import { Button, CardColumns, Card } from "react-bootstrap";

class CategoryList extends React.Component<{ categories; removeCategory }> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { categories, removeCategory } = this.props;
    const { items } = categories.result;
    return (
      <>
        <CardColumns>
          {items ? (
            items.map((item) => (
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
            <p>Nessuna categoria presente</p>
          )}
        </CardColumns>
      </>
    );
  }
}

export default CategoryList;
