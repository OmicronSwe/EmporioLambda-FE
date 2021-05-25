import React from "react";
import { Row, Col, Container, Alert, Button } from "react-bootstrap";
import { GetServerSideProps } from "next";
import Router from "next/router";
import { getSession, Session } from "next-auth/client";
import Layout from "../../../components/layout";
import {
  getCategories,
  getProduct,
  updateProduct,
  fileToBase64,
} from "../../../src/Services/dashboard";
import OldProductInformations from "../../../components/Dashboard/OldProductInformations";
import ModifyingProductForm from "../../../components/Dashboard/ModifyingProductForm";
import StoredProduct from "../../../src/types/StoredProduct";
import ProductSend from "../../../src/types/ProductSend";
import RawImage from "../../../src/types/RawImage";

class ModifyProductPage extends React.Component<
  { product: StoredProduct; categories: string[]; session },
  { productModified: boolean | null; errors: Map<string, string> }
> {
  constructor(props) {
    super(props);
    this.state = { productModified: null, errors: new Map<string, string>() };
  }

  formValidation = (
    name: string,
    description: string,
    price: string,
    image: RawImage,
    category: string,
    product: StoredProduct
  ) => {
    let isValid: boolean = true;
    // Refresh of the form errors and alerts
    const updatedErrors: Map<string, string> = new Map<string, string>();
    this.setState({ errors: updatedErrors, productModified: null });

    if (
      name === "" &&
      description === "" &&
      price === "" &&
      image === undefined &&
      category === ""
    ) {
      this.setState({ productModified: false });
      return false;
    }

    if (name === product.name) {
      updatedErrors.set(
        "productNameError",
        "The new product name cannot be the same as the old one"
      );
      isValid = false;
    }
    if (description === product.description) {
      updatedErrors.set(
        "productDescriptionError",
        "The new product description cannot be the same as the old one"
      );
      isValid = false;
    }
    if (Number.isNaN(Number(price)) || Number(price) < 0) {
      updatedErrors.set("productPriceError", "The price must be a positive number");
      isValid = false;
    }
    if (Number(price) === product.price) {
      updatedErrors.set(
        "productPriceError",
        "The new product price cannot be the same as the old one"
      );
      isValid = false;
    }
    if (category === product.category) {
      updatedErrors.set(
        "productCategoryError",
        "The new product category cannot be the same as the old one"
      );
      isValid = false;
    }

    this.setState({ errors: updatedErrors });
    return isValid;
  };

  updateProduct = async (event) => {
    event.preventDefault();
    const { product, session } = this.props;

    // Form parameters extraction

    const fileObject = event.target.productImage.files[0];
    let base64StringImage: string = "";
    if (fileObject) {
      base64StringImage = await fileToBase64(fileObject);
    }
    const name: string = event.target.productName.value ? event.target.productName.value : "";
    const description: string = event.target.productDescription.value
      ? event.target.productDescription.value
      : "";
    const price: string = event.target.productPrice.value ? event.target.productPrice.value : "";
    const image: RawImage =
      base64StringImage !== ""
        ? new RawImage(fileObject.type, `base64,${base64StringImage}`)
        : undefined;
    const category: string =
      event.target.productCategorySelection.value !== "Choose..."
        ? event.target.productCategorySelection.value
        : "";

    // Validation

    const isValid: boolean = this.formValidation(
      name,
      description,
      price,
      image,
      category,
      product
    );

    if (isValid) {
      // Sending a new product with modified infos
      const modifiedProduct: ProductSend = new ProductSend(
        name !== "" ? name : product.name,
        description !== "" ? description : product.description,
        image,
        price !== "" ? Number(price) : product.price,
        category !== "" ? category : product.category
      );
      await updateProduct(product.id, session, modifiedProduct);
      this.setState({ productModified: true });
    }
  };

  render() {
    const { product, categories } = this.props;
    const { productModified, errors } = this.state;
    return (
      <>
        <Layout title="Product modifying page">
          <Container>
            <Row className="justify-content-md-center">
              <h1>Product modification</h1>
            </Row>
            <Row>
              <Col>
                <OldProductInformations product={product} />
              </Col>
              <Col>
                <ModifyingProductForm
                  updateProduct={this.updateProduct}
                  categories={categories}
                  errors={errors}
                />
              </Col>
            </Row>
            {productModified !== null && productModified === true ? (
              <Container>
                <Row className="justify-content-md-center mt-3">
                  <Alert variant="success">
                    <Alert.Heading className="text-center">
                      Product edited Successfully!
                    </Alert.Heading>
                  </Alert>
                </Row>
                <Row className="justify-content-md-center">
                  <Button variant="success" onClick={() => Router.push("/dashboard")}>
                    Redirect to Dashboard
                  </Button>
                </Row>
              </Container>
            ) : (
              <p />
            )}
            {productModified !== null && productModified === false ? (
              <Alert variant="danger">
                <Alert.Heading className="text-center">
                  At least one field must be filled in to modify the product
                </Alert.Heading>
              </Alert>
            ) : (
              <p />
            )}
          </Container>
        </Layout>
      </>
    );
  }
}

export const getServerSideProps: GetServerSideProps = async ({ params, req }) => {
  const session: Session = await getSession({ req });
  if (session === undefined || !session?.adm) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      product: await getProduct(params.id.toString(), session),
      categories: await getCategories(session),
      session,
    },
  };
};

export default ModifyProductPage;
