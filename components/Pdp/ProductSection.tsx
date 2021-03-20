import React from "react";
import { Col, Form, Row } from "react-bootstrap";

class ProductSection extends React.Component<{ product }> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { product } = this.props;
    const item = product.result;
    return (
      <>
        <h1>Product Section</h1>
        <Form>
          <Form.Group as={Row} controlId="formPlainTextID">
            <Form.Label column lg="3">
              ID
            </Form.Label>
            <Col sm="9">
              <Form.Control plaintext readOnly defaultValue={item.id} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPlainTextName">
            <Form.Label column lg="3">
              Name
            </Form.Label>
            <Col sm="9">
              <Form.Control plaintext readOnly defaultValue={item.name} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPlainTextDescription">
            <Form.Label column lg="3">
              Description
            </Form.Label>
            <Col sm="9">
              <Form.Control plaintext readOnly defaultValue={item.description} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPlainTextCategory">
            <Form.Label column lg="3">
              Category
            </Form.Label>
            <Col sm="9">
              <Form.Control plaintext readOnly defaultValue={item.category} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPlainTextPrice">
            <Form.Label column lg="3">
              Price
            </Form.Label>
            <Col sm="9">
              <Form.Control plaintext readOnly defaultValue={item.price} />
            </Col>
          </Form.Group>
        </Form>
      </>
    );
  }
}

export default ProductSection;
