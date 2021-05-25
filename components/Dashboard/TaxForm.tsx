import React from "react";
import { Button, Form, Col, Row, Alert } from "react-bootstrap";

interface TaxFormProps {
  tax: number;
  taxChangedAlert: boolean;
  handleChangedAlert;
  insertTax;
}

const TaxForm = ({ tax, taxChangedAlert, handleChangedAlert, insertTax }: TaxFormProps) => {
  return (
    <>
      <div id="taxForm">
        <Form onSubmit={insertTax}>
          <Form.Group as={Row} id>
            <Form.Label column sm="4">
              Tax percentage
            </Form.Label>
            <Col sm="8">
              {" "}
              <Form.Control
                type="number"
                defaultValue={tax}
                name="rate"
                id="taxInput"
                min="0"
                max="100"
              />
            </Col>
          </Form.Group>
          <Form.Row className="text-center">
            <Col sm="12">
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Col>
          </Form.Row>
        </Form>
        {taxChangedAlert !== null && taxChangedAlert === true ? (
          <Alert variant="success" onClose={() => handleChangedAlert()} dismissible>
            <Alert.Heading>Tax rate changed correctly!</Alert.Heading>
          </Alert>
        ) : (
          <p />
        )}
        {taxChangedAlert !== null && taxChangedAlert === false ? (
          <Alert variant="danger" onClose={() => handleChangedAlert()} dismissible>
            <Alert.Heading>Error on tax rate change.</Alert.Heading>
          </Alert>
        ) : (
          <p />
        )}
      </div>
    </>
  );
};

export default TaxForm;
