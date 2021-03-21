import React from "react";
import Router from "next/router";
import { Button, Form } from "react-bootstrap";
import { fileToBase64 } from "../../pages/api/Services/dashboard";
import { Category } from "../../src/objects/Category";

// TODO: sostituire con un componente comune usato per inserire e modificare un prodotto (?)

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
    if (fileObject) {
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
      imgParam ? { image: imgParam } : null,
      event.target.productCategorySelection.value
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
                {categories ? (
                  categories.map((item) => <option>{item.name}</option>)
                ) : (
                  <option>no category found</option>
                )}
              </select>
            </div>
          </div>
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
