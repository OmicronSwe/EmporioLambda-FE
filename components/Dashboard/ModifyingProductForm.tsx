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

class ModifyingProductForm extends React.Component<{
  updateProduct;
  categories: string[];
}> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { categories, updateProduct } = this.props;
    return (
      <>
        <Form onSubmit={updateProduct}>
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
              <small id="productDescriptionHelpBlock" className="form-text text-muted">
                Maximum x characters.
              </small>
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
            </Col>
          </FormGroup>
          <Button type="submit" variant="primary">
            Submit
          </Button>
          <Button variant="danger" onClick={() => Router.push("/dashboard")}>
            Cancel
          </Button>
        </Form>
      </>
    );
  }
}

export default ModifyingProductForm;
