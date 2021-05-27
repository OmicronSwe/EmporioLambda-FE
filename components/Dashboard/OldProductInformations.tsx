import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import StoredProduct from "../../src/types/StoredProduct";

interface OldProductInformationsProps {
  product: StoredProduct;
}

const OldProductInformations = ({ product }: OldProductInformationsProps) => {
  return (
    <>
      <Form className="border border-dark p-3">
        <Form.Group as={Row} controlId="formPlainTextName">
          <Form.Label column lg="3">
            Actual Name
          </Form.Label>
          <Col sm="9">
            <Form.Control plaintext readOnly defaultValue={product.name} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formPlainTextDescription">
          <Form.Label column lg="3">
            Actual Description
          </Form.Label>
          <Col sm="9">
            <Form.Control plaintext readOnly defaultValue={product.description} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formPlainTextPrice">
          <Form.Label column lg="3">
            Actual Price
          </Form.Label>
          <Col sm="9">
            <Form.Control plaintext readOnly defaultValue={`${product.price.toFixed(2)}€`} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formPlainTextID">
          <Form.Label column lg="3">
            Actual Image
          </Form.Label>
          <Col sm="9">
            <img
              src={product.imageUrl ? product.imageUrl : ""}
              className="img-thumbnail"
              alt={product.name}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formPlainTextCategory">
          <Form.Label column lg="3">
            Actual Category
          </Form.Label>
          <Col sm="9">
            <Form.Control
              plaintext
              readOnly
              defaultValue={product.category ? product.category : ""}
            />
          </Col>
        </Form.Group>
      </Form>
    </>
  );
};

export default OldProductInformations;
