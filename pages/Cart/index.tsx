import React from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import Layout from "../../components/layout";
import ProductInCart from "../../src/objects/ProductInCart";
import CartListSection from "../../components/Cart/CartListSection";
import { getProductsInCart } from "../../pages/api/Services/cart";

class Cart extends React.Component<{ response; auth }, { products: ProductInCart[] }> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <Layout title="Cart page">
          <CartListSection auth={this.props.auth} products={this.props.response} />
        </Layout>
      </>
    );
  }
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
   const session = await getSession({ req }) //get session data
   if (session) {

    //Le seguenti righe sono fatte per riempire il carrelo in fase di testing  
    //await insertProductInCart({auth : session, body:{"id":"2dc2d8fa-9ded-4370-8d4e-426b38cd15e5","quantity":3}})
    //await insertProductInCart({auth : session, body:{"id":"2dc2d8fa-9ded-4370-8d4e-426b38cd15e4","quantity":3}}) 
    //

      const resp = await getProductsInCart(session) //external API call to get cart's product ids
      return { props: { response: resp["products"], auth: session } }
    } else { 
  return { props: { response: [], auth: null } }; // if not authenticated, return empty response and null email
 }
};

export default Cart;
