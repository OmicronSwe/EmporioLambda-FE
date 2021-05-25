import React from "react";
import { Col, Form, Image, Row } from "react-bootstrap";
import StoredProduct from "../../src/types/StoredProduct";

interface ProductSectionProps {
  product: StoredProduct;
}

const ProductSection = ( { product }: ProductSectionProps ) => {
    return (
      <>
        {product ? (
          <Form>
            <br />
            <Form.Row>
              <Col>
                <Image
                  id="imgProduct"
                  width={300}
                  src={product.imageUrl ? product.imageUrl : ""}
                  rounded
                />
              </Col>
              <Col>
                <Form.Group as={Row} controlId="formPlainTextID">
                  <Form.Label column lg="3">
                    <strong> ID </strong>
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control plaintext readOnly defaultValue={product.id} />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formPlainTextName">
                  <Form.Label column lg="3">
                    <strong> Name </strong>
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control plaintext readOnly defaultValue={product.name} />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formPlainTextDescription">
                  <Form.Label column lg="3">
                    <strong> Description </strong>
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control plaintext readOnly defaultValue={product.description} />
                  </Col>
                </Form.Group>
                {product.category !== null ? (
                  <Form.Group as={Row} controlId="formPlainTextCategory">
                    <Form.Label column lg="3">
                      <strong> Category </strong>
                    </Form.Label>
                    <Col sm="9">
                      <Form.Control plaintext readOnly defaultValue={product.category} />
                    </Col>
                  </Form.Group>
                ) : (
                  <p />
                )}
                <Form.Group as={Row} controlId="formPlainTextPrice">
                  <Form.Label column lg="3">
                    <strong> Price </strong>
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control plaintext readOnly defaultValue={`${product.price}€`} />
                  </Col>
                </Form.Group>
              </Col>
            </Form.Row>
            <br />
          </Form>
        ) : (
          <p> Product not found! </p>
        )}
      </>
    );
}

export default ProductSection;
