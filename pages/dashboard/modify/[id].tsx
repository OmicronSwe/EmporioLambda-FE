import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { GetServerSideProps } from "next";
import Router from "next/router";
import { getSession, Session } from "next-auth/client";
import Layout from "../../../components/layout";
import {
  getCategories,
  getProduct,
  updateProduct,
  fileToBase64,
} from "../../api/Services/dashboard";
import OldProductInformations from "../../../components/Dashboard/OldProductInformations";
import ModifyingProductForm from "../../../components/Dashboard/ModifyingProductForm";
import StoredProduct from "../../../src/objects/StoredProduct";

class ModifyProductPage extends React.Component<{
  product: StoredProduct;
  categories: string[];
  session;
}> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  updateProduct = async (event) => {
    event.preventDefault();
    const { product, session } = this.props;

    // TODO: validation

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

    // calls update only if there is at least one change to the product
    if (Object.keys(paramsJSON).length !== 0) {
      await updateProduct(product.id, session, paramsJSON);
    }
    // redirect to dashboard
    Router.push("/dashboard");
    // TODO: success/error alert
  };

  render() {
    const { product, categories } = this.props;
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
                <ModifyingProductForm updateProduct={this.updateProduct} categories={categories} />
              </Col>
            </Row>
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
