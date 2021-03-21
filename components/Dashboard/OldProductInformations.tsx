import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import { Product } from "../../src/objects/Product";

// TODO: sostituire con lo stesso componente usato per la visualizzazione del prodotto nella PDP (?)

class OldProductInformations extends React.Component<{ product:Product }> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { product } = this.props;
    return (
      <>
        <Form>
          <Form.Group as={Row} controlId="formPlainTextName">
            <Form.Label column lg="3">
              Name
            </Form.Label>
            <Col sm="9">
              <Form.Control plaintext readOnly defaultValue={product.name} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPlainTextDescription">
            <Form.Label column lg="3">
              Description
            </Form.Label>
            <Col sm="9">
              <Form.Control plaintext readOnly defaultValue={product.description} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPlainTextPrice">
            <Form.Label column lg="3">
              Price
            </Form.Label>
            <Col sm="9">
              <Form.Control plaintext readOnly defaultValue={product.price} />
            </Col>
          </Form.Group>

          {/*image section*/}
          {/*
          <Form.Group as={Row} controlId="formPlainTextCategory">
            <Form.Label column lg="3">
              Category
            </Form.Label>
            <Col sm="9">
              <Form.Control plaintext readOnly defaultValue={product.category.name} />
            </Col>
          </Form.Group>
          */}
          <Form.Group as={Row} controlId="formPlainTextID">
            <Form.Label column lg="3">
              ID
            </Form.Label>
            <Col sm="9">
              <Form.Control plaintext readOnly defaultValue={product.id} />
            </Col>
          </Form.Group>
        </Form>
      </>
    );
  }
}

export default OldProductInformations;