import React,{FC} from "react";
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

type NewProductFormProps = {
  insertProduct,
  categories: string[],
  productInsertedAlert: boolean
}

const NewProductForm: FC<NewProductFormProps> = ({ insertProduct, categories, productInsertedAlert }) => {
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
                    />
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
                <Form.Row className="text-center">
                  <Col sm="12">
                    <Button type="submit" variant="primary">
                      Submit
                    </Button>
                  </Col>
                </Form.Row>
              </Form>
              {productInsertedAlert !== null && productInsertedAlert === true ? (
                <Alert variant="success">
                  <Alert.Heading>Product created successfully!</Alert.Heading>
                </Alert>
              ) : (
                <p />
              )}
              {productInsertedAlert !== null && productInsertedAlert === false ? (
                <Alert variant="danger">
                  <Alert.Heading>
                    All fields must be filled in to create a new product
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
}

export default NewProductForm;
