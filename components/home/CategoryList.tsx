import Router from "next/router";
import React from "react";
import { Button, CardColumns, Card } from "react-bootstrap";

interface CategoryListProps {
  categories: string[];
}

const CategoryList = ({ categories }: CategoryListProps) => {
  return (
    <>
      <CardColumns>
        {categories ? (
          categories.map((item) => (
            <Card key={item}>
              <Card.Body>
                <Card.Title>{item}</Card.Title>
                <Button
                  title={item}
                  variant="danger"
                  onClick={() => {
                    Router.push(`/plp/${item}`);
                  }}
                >
                  View Products
                </Button>
              </Card.Body>
            </Card>
          ))
        ) : (
          <h3>No category found</h3>
        )}
      </CardColumns>
    </>
  );
};

export default CategoryList;
