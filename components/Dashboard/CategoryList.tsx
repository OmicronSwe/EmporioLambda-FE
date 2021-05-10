import React from "react";
import { Button, CardColumns, Card } from "react-bootstrap";

interface CategoryListProps {
  categories: string[];
  removeCategory;
}

const CategoryList = ({ categories, removeCategory }: CategoryListProps) => {
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

export default CategoryList;
