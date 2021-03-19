import React from 'react'
import { GetServerSideProps } from "next"
import Layout from "../../components/layout";
import { getSession } from "next-auth/client"
import getlambdaResponse from "../api/lib/lambdas"
import ProductInCart from '../../src/objects/ProductInCart';
import myJson from '../../components/Cart/CartSample'
import CartListSection from '../../components/Cart/CartListSection';

class Cart extends React.Component<{ response; auth }, { products: ProductInCart[] }> {
    constructor(props) {
      super(props);
    }
  
    render() {
      return (
        <>
          <Layout title="Cart page">
            <CartListSection auth={this.props.auth} products={myJson}/> 
          </Layout>
        </>
      );
    }
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    /*const session = await getSession({ req }) //get session data
    if (session) {
      const resp = await (await getlambdaResponse("cart/" + session.user.email)).props.response //external API call to get cart's product ids
  
      if (resp.message == "Element not found") {
        //if no cart is found, return empty response
        return { props: { response: [], auth: session.user.email } }
      }
      return { props: { response: resp, auth: session.user.email } }
    //} else {*/
      return { props: { response: [], auth: null } } //if not authenticated, return empty response and null email
    //}
  }


export default Cart