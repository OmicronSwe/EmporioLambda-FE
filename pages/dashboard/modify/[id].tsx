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
import StoredProduct from "../../../types/StoredProduct";
import ProductSend from "../../../types/ProductSend";
import RawImage from "../../../types/RawImage";

class ModifyProductPage extends React.Component<
  { product: StoredProduct; categories: string[]; session },
  { productModifiedAlert: boolean | null }
> {
  constructor(props) {
    super(props);
    this.state = { productModifiedAlert: null };
  }

  updateProduct = async (event) => {
    event.preventDefault();
    const { product, session } = this.props;

    // TODO: validation

    const fileObject = event.target.productImage.files[0];
    let base64StringImage: string = "";
    if (fileObject) {
      base64StringImage = await fileToBase64(fileObject);
    }

    const name = event.target.productName.value ? event.target.productName.value : "";
    const description = event.target.productDescription.value
      ? event.target.productDescription.value
      : "";
    const price = event.target.productPrice.value ? event.target.productPrice.value : "";
    const image: RawImage =
      base64StringImage !== ""
        ? new RawImage(fileObject.type, `base64,${base64StringImage}`)
        : undefined;
    const category =
      event.target.productCategorySelection.value !== "Choose..."
        ? event.target.productCategorySelection.value
        : "";

    const atLeastOneInfoInserted: boolean =
      name !== "" || description !== "" || price !== "" || image !== undefined || category !== "";

    if (atLeastOneInfoInserted) {
      const modifiedProduct: ProductSend = new ProductSend(
        null,
        name !== "" ? name : product.name,
        description !== "" ? description : product.description,
        image,
        price !== "" ? parseInt(price, 10) : product.price,
        category !== "" ? category : product.category
      );
      await updateProduct(product.id, session, modifiedProduct);
      // redirect to dashboard
      Router.push("/dashboard");
    } else {
      this.setState({ productModifiedAlert: atLeastOneInfoInserted });
    }
  };

  render() {
    const { product, categories } = this.props;
    const { productModifiedAlert } = this.state;
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
                  productModifiedAlert={productModifiedAlert}
                />
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
