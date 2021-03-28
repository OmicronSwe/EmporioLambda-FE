import React from "react";
import { Button, Accordion, Card, Form, Col, Row } from "react-bootstrap";
import { Product } from "../../src/objects/Product";

class FilterByPrice extends React.Component<{
  products: Product[];
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
        <Accordion style={{ width: "50%" }}>
          <Card>
              <Card.Body>
                <Form onSubmit={filterByPrice}> //creare funzione filtro
                  <Form.Group as={Row}>
                    <Form.Label column sm="4">
                      Price Min
                    </Form.Label>
                    <Col sm="8">
                      {" "}
                      <Form.Control placeholder="Price Min" name="Price Min" />
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
