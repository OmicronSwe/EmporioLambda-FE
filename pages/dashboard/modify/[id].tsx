import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { GetServerSideProps } from "next";
import Router from "next/router";
import { getSession } from "next-auth/client";
import Layout from "../../../components/layout";
import { Product } from "../../../src/objects/Product";
import { getCategories, getProduct, updateProduct } from "../../api/Services/dashboard";
import OldProductInformations from "../../../components/Dashboard/OldProductInformations";
import ModifyingProductForm from "../../../components/Dashboard/ModifyingProductForm";
import { Category } from "../../../src/objects/Category";

class ModifyProductPage extends React.Component<{
  product: Product;
  categories: Category[];
  session;
}> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  updateProduct = async (params) => {
    const { product, session } = this.props;
    if (Object.keys(JSON.parse(params)).length !== 0) {
      // calls update only if there is at least one change to the product
      await updateProduct(product.id, params, session);
    }
    // redirect to dashboard
    Router.push("/dashboard");
    // success/error alert
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
  const session = await getSession({ req });
  return {
    props: {
      product: await getProduct(params.id.toString(), session),
      categories: await getCategories(session),
    },
  };
};

export default ModifyProductPage;
