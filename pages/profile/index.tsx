import React from "react";
import Router from "next/router";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import Layout from "../../components/layout";
import ProfileInfoForm from "../../components/Profile/ProfileInfoForm";
import { getProfile, removeProfile } from "../api/Services/profile";
import { Profile } from "../../src/objects/Profile";
import ProfileButton from "../../components/Profile/ProfileButton";
import OrderList from "../../components/Profile/OrderList";
import { getOrdersProfile } from "../api/Services/order";
import { Order } from "../../src/objects/Order";

class ProfilePage extends React.Component<{ profile: Profile; orders: Order[]; session }> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  removeProfile = async () => {
    const { profile, session } = this.props;

    // TODO: validation

    await removeProfile(profile, session);

    // redirect to profile
    Router.push("/");
    // TODO: success/error alert
  };

  render() {
    const { profile, orders } = this.props;
    return (
      <>
        <Layout title="Profile page">
          <h1>Profile Section</h1>
          <ProfileInfoForm profile={profile} />
          <ProfileButton profile={profile} removeProfile={this.removeProfile} />

          <h1>Order Section</h1>
          <OrderList orders={orders} />
        </Layout>
      </>
    );
  }
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  const profile = await getProfile(session);
  return {
    props: {
      profile,
      orders: await getOrdersProfile(session.accessToken, profile),
    },
  };
};

export default ProfilePage;