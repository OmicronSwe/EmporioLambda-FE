import React, { useState } from "react";

import {
  Button,
  Accordion,
  Card,
  Form,
  Row,
  Col,
  InputGroup,
  FormControl,
  FormGroup,
  FormLabel,
  Alert,
} from "react-bootstrap";

interface NewProductFormProps {
  insertProduct;
  categories: string[];
  isProductInserted: boolean | null;
  errors: Map<string, string>;
}

const NewProductForm = ({
  insertProduct,
  categories,
  isProductInserted,
  errors,
}: NewProductFormProps) => {
  const [show, setShow] = useState(true);
  return (
    <>
      <Accordion>
        <Card>
          <Card.Header style={{backgroundColor: "white"}}>
            <div className="d-flex justify-content-center">
            <Accordion.Toggle as={Button} eventKey="1">
              Add new product
            </Accordion.Toggle>
            </div>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
              <Form onSubmit={insertProduct}>
                <FormGroup as={Row}>
                  <FormLabel column sm="4" htmlFor="productName">
                    Product Name
                  </FormLabel>
                  <Col sm="4">
                    <FormControl
                      type="text"
                      className="sm"
                      id="productName"
                      name="productName"
                      placeholder="Name"
                    />
                    {errors.has("productNameError") ? (
                      <small id="productNameErrors" className="text-danger">
                        {errors.get("productNameError")}
                      </small>
                    ) : (
                      <p />
                    )}
                  </Col>
                </FormGroup>
                <FormGroup as={Row}>
                  <FormLabel column sm="4" htmlFor="productDescription">
                    Product Description
                  </FormLabel>
                  <Col sm="4">
                    <FormControl
                      as="textarea"
                      className="sm"
                      id="productDescription"
                      name="productDescription"
                      placeholder="Description"
                      rows={3}
                    />
                    {errors.has("productDescriptionError") ? (
                      <small id="productDescriptionErrors" className="text-danger">
                        {errors.get("productDescriptionError")}
                      </small>
                    ) : (
                      <p />
                    )}
                  </Col>
                </FormGroup>
                <FormGroup as={Row}>
                  <FormLabel column sm="4" htmlFor="productPrice">
                    Product Price
                  </FormLabel>
                  <Col sm="4">
                    <InputGroup className="sm-4">
                      <FormControl
                        className="sm-4"
                        name="productPrice"
                        id="productPrice"
                        placeholder="Price"
                      />
                      <InputGroup.Append>
                        <InputGroup.Text>€</InputGroup.Text>
                      </InputGroup.Append>
                    </InputGroup>
                    {errors.has("productPriceError") ? (
                      <small id="productPriceErrors" className="text-danger">
                        {errors.get("productPriceError")}
                      </small>
                    ) : (
                      <p />
                    )}
                  </Col>
                </FormGroup>
                <FormGroup as={Row}>
                  <FormLabel column sm="4" htmlFor="productImage">
                    Product Image
                  </FormLabel>
                  <Col sm="4">
                    <FormControl
                      type="file"
                      className="form-control-sm"
                      id="productImage"
                      name="productImage"
                    />
                    {errors.has("productImageError") ? (
                      <small id="productImageErrors" className="text-danger">
                        {errors.get("productImageError")}
                      </small>
                    ) : (
                      <p />
                    )}
                  </Col>
                </FormGroup>
                <FormGroup as={Row}>
                  <FormLabel column sm="4" htmlFor="productCategorySelection">
                    Product Category
                  </FormLabel>
                  <Col sm="4">
                    <FormControl
                      as="select"
                      className="form-control-sm"
                      defaultValue="Choose..."
                      id="productCategorySelection"
                      name="productCategorySelection"
                    >
                      <option>Choose...</option>
                      {categories ? (
                        categories.map((item) => <option key={item}>{item}</option>)
                      ) : (
                        <option key="noCategory">no category found</option>
                      )}
                    </FormControl>
                    {errors.has("productCategoryError") ? (
                      <small id="productCategoryErrors" className="text-danger">
                        {errors.get("productCategoryError")}
                      </small>
                    ) : (
                      <p />
                    )}
                  </Col>
                </FormGroup>
                <Form.Row className="text-center">
                  <Col sm="12">
                    <Button type="submit" variant="primary" onClick={() => setShow(true)}>
                      Submit
                    </Button>
                  </Col>
                </Form.Row>
              </Form>
              {isProductInserted !== null && isProductInserted === true ? (
                <Alert variant="success" show={show} onClose={() => setShow(false)} dismissible>
                  <Alert.Heading className="text-center">
                    Product created successfully!
                  </Alert.Heading>
                </Alert>
              ) : (
                <p />
              )}
              {isProductInserted !== null && isProductInserted === false ? (
                <Alert variant="danger" show={show} onClose={() => setShow(false)} dismissible>
                  <Alert.Heading className="text-center">
                    A Server Error occured creating the product, please retry
                  </Alert.Heading>
                </Alert>
              ) : (
                <p />
              )}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </>
  );
};

export default NewProductForm;
