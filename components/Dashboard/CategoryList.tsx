import React from "react";
import { Button, CardColumns, Card, Alert } from "react-bootstrap";

/* interface CategoryListProps {
  categories: string[];
  removeCategory;
  categoryRemovedAlert: boolean;
  handleRemoveAlert;
} */

class CategoryList extends React.Component<{
  categories;
  removeCategory;
  categoryRemovedAlert;
  handleRemoveAlert;
}> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { categories, removeCategory, categoryRemovedAlert, handleRemoveAlert } = this.props;
    return (
      <>
        <div>
          {categoryRemovedAlert !== null && categoryRemovedAlert === true ? (
            <Alert variant="success" onClose={() => handleRemoveAlert()} dismissible>
              <Alert.Heading>Category removed successfully!</Alert.Heading>
            </Alert>
          ) : (
            <p />
          )}
          {categoryRemovedAlert !== null && categoryRemovedAlert === false ? (
            <Alert variant="danger" onClose={() => handleRemoveAlert()} dismissible>
              <Alert.Heading>Error on category removal!</Alert.Heading>
            </Alert>
          ) : (
            <p />
          )}
          <CardColumns>
            {categories ? (
              categories.map((item) => (
                <Card key={item}>
                  <Card.Body>
                    <Card.Title>{item}</Card.Title>
                    <Button variant="danger" onClick={() => removeCategory(item)} title={item}>
                      Remove
                    </Button>
                  </Card.Body>
                </Card>
              ))
            ) : (
              <p>No category found</p>
            )}
          </CardColumns>
        </div>
      </>
    );
  }
}

export default CategoryList;
