import React from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import Layout from "../../components/layout";
import getlambdaResponse from "../api/lib/lambdas";
import ProductInCart from "../../src/objects/ProductInCart";
import myJson from "../../components/Cart/CartSample";
import CartListSection from "../../components/Cart/CartListSection";
import { decode } from 'jsonwebtoken'

class Cart extends React.Component<{ response; auth }, { products: ProductInCart[] }> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <Layout title="Cart page">
          <CartListSection auth={this.props.auth} products={myJson} />
        </Layout>
      </>
    );
  }
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
   const session = await getSession({ req }) //get session data
   if (session) {
      const username = decode(session.accessToken).sub;
      const resp = await getlambdaResponse("cart/" + username, "GET", session.accessToken) //external API call to get cart's product ids
  
      if (resp.props.response == "Element not found") {
        //if no cart is found, return empty response
        return { props: { response: [], auth: session } }
      }
      return { props: { response: resp, auth: session } }
    } else { 
  return { props: { response: [], auth: null } }; // if not authenticated, return empty response and null email
 }
};

export default Cart;
