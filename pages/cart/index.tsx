import React from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import { decode } from "jsonwebtoken";
import Layout from "../../components/layout";
import CartListSection from "../../components/Cart/CartListSection";
import { getProductsInCart } from "../../src/Services/cart";
import PayButton from "../../components/Cart/PayButton";
import Cart from "../../src/types/Cart";

class CartPage extends React.Component<{ cart: Cart; session }, { payButtonEnabled: boolean }> {
  constructor(props) {
    super(props);
    const { cart } = this.props;
    this.state = { payButtonEnabled: cart ? cart.products.length !== 0 : false };
  }

  updatePayButton = (length: number) => {
    if (length !== 0) this.setState({ payButtonEnabled: true });
    else this.setState({ payButtonEnabled: false });
  };

  render() {
    const { cart, session } = this.props;
    const { payButtonEnabled } = this.state;
    const username = session ? decode(session.accessToken).sub : null;
    return (
      <>
        <Layout title="Cart page">
          <CartListSection
            session={session}
            cart={cart ? new Cart(cart.products, cart.tax) : new Cart([], 0)}
            updatePayButton={this.updatePayButton}
          />
          <PayButton username={username} payButtonEnabled={payButtonEnabled} />
        </Layout>
      </>
    );
  }
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req }); // get session data
  if (session) {
    const resp: Cart = await getProductsInCart(session); // external API call to get cart's product ids
    return { props: { cart: JSON.parse(JSON.stringify(resp)), session } };
  }
  return { props: { cart: null, session: null } }; // if not authenticated, return empty response and null session
};

export default CartPage;
