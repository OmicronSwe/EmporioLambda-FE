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
import { fileToBase64 } from "../../pages/api/Services/dashboard";
import { Category } from "../../src/objects/Category";

class ModifyingProductForm extends React.Component<{
  updateProduct;
  categories: Category[];
}> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  sendParams = async (event) => {
    event.preventDefault();

    // image file to base64 conversion
    const fileObject = event.target.productImage.files[0];
    let img64 = null;
    let imgParam = null;
    if (fileObject !== undefined) {
      img64 = await fileToBase64(fileObject);
      imgParam = {
        mime: fileObject.type,
        imageCode: `base64,${img64}`,
      };
    }
    // sending only user's inserted input
    const paramsJSON = {};
    Object.assign(
      paramsJSON,
      event.target.productName.value ? { name: event.target.productName.value } : null,
      event.target.productDescription.value
        ? { description: event.target.productDescription.value }
        : null,
      event.target.productPrice.value ? { price: event.target.productPrice.value } : null,
      imgParam !== null ? { image: imgParam } : null,
      event.target.productCategorySelection.value !== "Choose..."
        ? { category: event.target.productCategorySelection.value }
        : null
    );
    const { updateProduct } = this.props;
    await updateProduct(JSON.stringify(paramsJSON));
  };

  render() {
    const { categories } = this.props;
    return (
      <>
        <Form onSubmit={this.sendParams}>
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
