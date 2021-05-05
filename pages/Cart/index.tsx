import React from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import { decode } from "jsonwebtoken";
import Layout from "../../components/layout";
import CartListSection from "../../components/Cart/CartListSection";
import { getProductsInCart } from "../api/Services/cart";
import PayButton from "../../components/Cart/PayButton";

const Cart = (props: { response; session }) => {
  const { response, session } = props;
  const username = session ? decode(session.accessToken).sub : null;
  // <CheckoutSection/>
  return (
    <>
      <Layout title="Cart page">
        <CartListSection session={session} products={response} />
        <PayButton username={username} />
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req }); // get session data
  if (session) {
    const resp: any = await getProductsInCart(session); // external API call to get cart's product ids
    return { props: { response: resp.products, session } };
  }
  return { props: { response: [], session: null } }; // if not authenticated, return empty response and null session
};

export default Cart;
