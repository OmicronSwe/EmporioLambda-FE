import React from "react";
import { Row, Col, Container } from "react-bootstrap"
import { GetServerSideProps } from "next";
import Layout from "../../../components/layout";
import { Product } from "../../../src/objects/Product";
import { getCategories, getProduct, updateProduct } from "../../api/Services/dashboard";
import OldProductInformations from "../../../components/Dashboard/OldProductInformations";
import ModifyingProductForm from "../../../components/Dashboard/ModifyingProductForm"
import { Category } from "../../../src/objects/Category";
import Router from "next/router"

class ModifyProductPage extends React.Component< { product: Product; categories: Category[] } >{
    constructor(props) {
        super(props);
        this.state = {};
    }

    updateProduct = async (params) => {
        const { product } = this.props;
        //updateProduct
        await updateProduct(product.id, params);
        //redirect alla dashboard
        Router.push("/dashboard");
        //alert di successo/errore
    };

    render() {
        const { product, categories } = this.props;
        return (
            <>
            <Layout title="Product modifying page">
                <Container>
                    <Row className="justify-content-md-center"><h1>Product modification</h1></Row>
                    <Row>
                        <Col><OldProductInformations product={product} /></Col>
                        <Col><ModifyingProductForm updateProduct={this.updateProduct} categories={categories} /></Col>
                    </Row>
                </Container>
            </Layout>
            </>
        );
    }
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    return {
      props: {
        product: await getProduct(params.id.toString()),
        categories: await getCategories(),
      },
    };
  };

  export default ModifyProductPage;