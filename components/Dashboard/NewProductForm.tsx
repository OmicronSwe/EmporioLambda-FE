import React from "react";
import { Button, Accordion, Card, Form } from "react-bootstrap";
import { fileToBase64 } from "../../pages/api/Services/dashboard";
import { Category } from "../../src/objects/Category"

class NewProductForm extends React.Component<{ insertProduct; categories: Category[]; alert: boolean }> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  sendParams = async (event) => {
    // conversione parametri in stringJSON
    event.preventDefault();

    let fileObject = event.target.productImage.files[0];

    let img64 = await fileToBase64(fileObject);
    
    let paramImg = {
      mime : fileObject.type,
      imageCode : "base64,"+img64
    };

    const stringJSON = JSON.stringify({
      name: event.target.productName.value,
      description: event.target.productDescription.value,
      price: event.target.productPrice.value,
      image: paramImg,
      category: event.target.productCategorySelection.value,
    });
    const { insertProduct } = this.props;
    await insertProduct(stringJSON);
    //document.getElementById("message").innerHTML = result.message;
  };

  render() {
    const { categories, alert } = this.props;
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
                <Form onSubmit={this.sendParams}>
                  <div className="form-group row">
                    <label className="col-form-label col-sm-4" htmlFor="productName">
                      Product name
                    </label>
                    <div className="col-sm-4">
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="productName"
                        name="productName"
                        placeholder="Name"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-form-label col-sm-4" htmlFor="productDescription">
                      Product description
                    </label>
                    <div className="col-sm-4">
                      <textarea
                        className="form-control form-control-sm"
                        id="productDescription"
                        name="productDescription"
                        placeholder="Description"
                        rows={3}
                        aria-describedby="productDescriptionHelpBlock"
                      />
                      <small id="productDescriptionHelpBlock" className="form-text text-muted">
                        Maximum x characters.
                      </small>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-form-label col-sm-4" htmlFor="productPrice">
                      Product price
                    </label>
                    <div className="col-sm-4">
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="productPrice"
                        name="productPrice"
                        placeholder="Price"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-form-label col-sm-4" htmlFor="productImage">
                      Product image
                    </label>
                    <div className="col-sm-4">
                      <input
                        type="file"
                        className="form-control-file form-control-sm"
                        id="productImage"
                        name="productImage"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-form-label col-sm-4" htmlFor="productCategorySelection">
                      Product category
                    </label>
                    <div className="col-sm-4">
                      <select
                        className="form-control form-control-sm"
                        id="productCategorySelection"
                        name="productCategorySelection"
                      >
                        {categories? (
                          categories.map((item) => (
                            <option>{item.name}</option>
                          ))
                        ) : (
                          <option>no category found</option>
                        )}
                      </select>
                    </div>
                  </div>
                  <Button type="submit" variant="primary">
                    Submit
                  </Button>
                </Form>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
        {alert? <p>prodotto inserito</p> : <p></p>}
      </>
    );
  }
}

export default NewProductForm;
