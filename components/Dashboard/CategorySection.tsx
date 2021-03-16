import React from "react";
import { Accordion, Button, Card, CardColumns, Col, Form, Row } from "react-bootstrap";

class CategorySection extends React.Component<{doModelAction}> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const doModelAction = this.props.doModelAction
    return (
      <>
        <h1>Category Section</h1>
        <Accordion style={{ width: "50%" }}>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} eventKey="0">
                Add new category
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <Form>
                  <Form.Group as={Row}>
                    <Form.Label column sm="4">
                      Category name
                    </Form.Label>
                    <Col sm="8">
                      {" "}
                      <Form.Control placeholder="Name" />
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
        <CardColumns>
          <Card>
            <Card.Body>
              <Card.Title>Name</Card.Title>
              <Button variant="danger" onClick={() => doModelAction()}>Remove</Button>
              <Button variant="warning">Modify</Button>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Name</Card.Title>
              <Button variant="danger">Remove</Button>
              <Button variant="warning">Modify</Button>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Name</Card.Title>
              <Button variant="danger">Remove</Button>
              <Button variant="warning">Modify</Button>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Name</Card.Title>
              <Button variant="danger">Remove</Button>
              <Button variant="warning">Modify</Button>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Name</Card.Title>
              <Button variant="danger">Remove</Button>
              <Button variant="warning">Modify</Button>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Name</Card.Title>
              <Button variant="danger">Remove</Button>
              <Button variant="warning">Modify</Button>
            </Card.Body>
          </Card>
        </CardColumns>
      </>
    );
  }
}

export default CategorySection;
