import React from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import Layout from "../../components/layout";
import CartListSection from "../../components/Cart/CartListSection";
import { getProductsInCart } from "../api/Services/cart";

const Cart = (props: { response; session }) => {
  const { response, session } = props;
  //<CheckoutSection/>
  return (
    <>
      <Layout title="Cart page">
        <CartListSection session={session} products={response} />
        
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req }); // get session data
  if (session) {

    const resp: any = await getProductsInCart(session); // external API call to get cart's product ids
    return { props: { response: resp.products, session: session } };
  }
  return { props: { response: [], session: null } }; // if not authenticated, return empty response and null session
};

export default Cart;
