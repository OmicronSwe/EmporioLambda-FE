import React from "react";
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

class NewProductForm extends React.Component<{
  insertProduct;
  categories: string[];
  productInsertedAlert: boolean;
}> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { categories, productInsertedAlert, insertProduct } = this.props;

    return (
      <>
        <Accordion>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} eventKey="1">
                Add new product
              </Accordion.Toggle>
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
                        aria-describedby="productDescriptionHelpBlock"
                      />
                      <small id="productDescriptionHelpBlock" className="form-text text-muted">
                        Maximum x characters.
                      </small>
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
                        id="productCategorySelection"
                        name="productCategorySelection"
                      >
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
                </Form>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
        {productInsertedAlert !== null && productInsertedAlert === true ? (
          <Alert variant="success">
            <Alert.Heading>Product created successfully!</Alert.Heading>
          </Alert>
        ) : (
          <p />
        )}
        {productInsertedAlert !== null && productInsertedAlert === false ? (
          <Alert variant="danger">
            <Alert.Heading>Error occurred creating the product, please retry!</Alert.Heading>
          </Alert>
        ) : (
          <p />
        )}
      </>
    );
  }
}

export default NewProductForm;
