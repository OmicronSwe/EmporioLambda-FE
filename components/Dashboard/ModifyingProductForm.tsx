import React from "react";
import Router from "next/router";
import {
  Button,
  Form,
  Row,
  Col,
  InputGroup,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";

interface ModifyingProductFormProps {
  updateProduct;
  categories: string[];
  errors: Map<string, string>;
}

const ModifyingProductForm = ({ updateProduct, categories, errors }: ModifyingProductFormProps) => {
  return (
    <>
      <Form onSubmit={updateProduct} className="border border-dark p-3">
        <FormGroup as={Row}>
          <FormLabel column sm="5" htmlFor="productName">
            New Name
          </FormLabel>
          <Col sm="6">
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
          <FormLabel column sm="5" htmlFor="productDescription">
            New Description
          </FormLabel>
          <Col sm="6">
            <FormControl
              as="textarea"
              className="sm"
              id="productDescription"
              name="productDescription"
              placeholder="Description"
              rows={3}
              aria-describedby="productDescriptionHelpBlock"
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
          <FormLabel column sm="5" htmlFor="productPrice">
            New Price
          </FormLabel>
          <Col sm="3">
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
          <FormLabel column sm="5" htmlFor="productImage">
            New Image
          </FormLabel>
          <Col sm="6">
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
          <FormLabel column sm="5" htmlFor="productCategorySelection">
            New Category
          </FormLabel>
          <Col sm="6">
            <FormControl
              as="select"
              defaultValue="Choose..."
              className="form-control-sm"
              id="productCategorySelection"
              name="productCategorySelection"
            >
              <option>Choose...</option>
              {categories ? (
                categories.map((item) => <option>{item}</option>)
              ) : (
                <option>no category found</option>
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
            <Button type="submit" variant="primary">
              Submit
            </Button>
            <Button variant="danger" onClick={() => Router.push("/dashboard")}>
              Cancel
            </Button>
          </Col>
        </Form.Row>
      </Form>
    </>
  );
};

export default ModifyingProductForm;
