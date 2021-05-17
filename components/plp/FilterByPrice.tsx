import React from "react";
import { Button, Accordion, Card, Form, Col, Row } from "react-bootstrap";

class FilterByPrice extends React.Component<{
  filterByPrice;
}> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { filterByPrice } = this.props;
    return (
      <>
        <Accordion style={{ width: "40%" }}>
          <Card>
            <Card.Body>
              <Form onSubmit={filterByPrice}>
                <Form.Group as={Row}>
                  <Form.Label column sm="4">
                    Price Min
                  </Form.Label>
                  <Col sm="8">
                    {" "}
                    <Form.Control 
                      placeholder="Price Min"
                      name="PriceMin"
                      id="PriceMin" />
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label column sm="4">
                    Price Max
                  </Form.Label>
                  <Col sm="8">
                    {" "}
                    <Form.Control 
                      placeholder="Price Max"
                      name="PriceMax"
                      id="PriceMax" />
                  </Col>
                </Form.Group>
                <Button variant="primary" type="submit">
                  Filter
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Accordion>
      </>

    );
  }
}

export default FilterByPrice;
