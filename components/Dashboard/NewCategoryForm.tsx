import React from "react";
import { Button, Accordion, Card, Form, Col, Row } from "react-bootstrap";

interface NewCategoryFormProps {
  insertCategory;
}

const NewCategoryForm = ({ insertCategory }: NewCategoryFormProps) => {
  return (
    <>
      <Accordion style={{ width: "50%" }}>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} eventKey="0">
              Add new category
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <Form onSubmit={insertCategory}>
                <Form.Group as={Row}>
                  <Form.Label column sm="4">
                    Category name
                  </Form.Label>
                  <Col sm="8">
                    {" "}
                    <Form.Control placeholder="Name" name="name" />
                  </Col>
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </>
  );
}

export default NewCategoryForm;
