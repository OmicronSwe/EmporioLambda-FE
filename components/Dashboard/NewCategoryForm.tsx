import React from "react";
import { Button, Accordion, Card, Form, Col, Row, Alert } from "react-bootstrap";

interface NewCategoryFormProps {
  insertCategory;
  categoryInsertedAlert: boolean;
  handleInsertAlert;
}

const NewCategoryForm = ({
  insertCategory,
  categoryInsertedAlert,
  handleInsertAlert,
}: NewCategoryFormProps) => {
  return (
    <>
      <div className="d-flex justify-content-center">
        <Accordion style={{ width: "50%" }}>
          <Card>
            <Card.Header style={{ backgroundColor: "white" }}>
              <div className="d-flex justify-content-center">
                <Accordion.Toggle as={Button} eventKey="0">
                  Add new category
                </Accordion.Toggle>
              </div>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <Form onSubmit={insertCategory}>
                  <Form.Group as={Row}>
                    <Form.Label column sm="4">
                      Category name
                    </Form.Label>
                    <Col sm="8">
                      <Form.Control placeholder="Name" name="name" id="categoryName" />
                    </Col>
                  </Form.Group>
                  <Form.Row className="text-center">
                    <Col sm="12">
                      <Button variant="primary" type="submit" id="categoryInsertSubmit">
                        Submit
                      </Button>
                    </Col>
                  </Form.Row>
                </Form>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
        {categoryInsertedAlert !== null && categoryInsertedAlert === true ? (
          <Alert variant="success" onClose={() => handleInsertAlert()} dismissible>
            <Alert.Heading className="text-center">Category created successfully!</Alert.Heading>
          </Alert>
        ) : (
          <p />
        )}
        {categoryInsertedAlert !== null && categoryInsertedAlert === false ? (
          <Alert variant="danger" onClose={() => handleInsertAlert()} dismissible>
            <Alert.Heading className="text-center">
              Error on category creation, check if it already exists
            </Alert.Heading>
          </Alert>
        ) : (
          <p />
        )}
      </div>
    </>
  );
};

export default NewCategoryForm;
