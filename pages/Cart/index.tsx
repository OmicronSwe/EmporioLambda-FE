import React from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import { decode } from "jsonwebtoken";
import Layout from "../../components/layout";
import CartListSection from "../../components/Cart/CartListSection";
import { getProductsInCart } from "../../src/Services/cart";
import PayButton from "../../components/Cart/PayButton";
import Cart from "../../src/types/Cart";

const CartPage = (props: { response: Cart; session }) => {
  const { response, session } = props;
  const username = session ? decode(session.accessToken).sub : null;
  // <CheckoutSection/>
  return (
    <>
      <Layout title="Cart page">
        <CartListSection session={session} cart={new Cart(response.products)} />
        <PayButton username={username} />
      </Layout>
    </>
  );
};

/*export async function getStaticPaths(req){
  return{
    paths: [{params: {req: req}}],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  const session = await getSession(params); // get session data
  if (session) {
    const resp: any = await getProductsInCart(session); // external API call to get cart's product ids
    return { props: { response: JSON.parse(JSON.stringify(resp)), session } };
  }
  return { props: { response: { products: [] }, session: null } }; // if not authenticated, return empty response and null session
}*/

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req }); // get session data
  if (session) {
    const resp: any = await getProductsInCart(session); // external API call to get cart's product ids
    return { props: { response: JSON.parse(JSON.stringify(resp)), session } };
  }
  return { props: { response: { products: [] }, session: null } }; // if not authenticated, return empty response and null session
};

export default CartPage;
