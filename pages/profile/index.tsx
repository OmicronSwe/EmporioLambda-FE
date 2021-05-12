import React from "react";
import { GetServerSideProps } from "next";
import { getSession, signOut } from "next-auth/client";
import { Alert, Button, Container } from "react-bootstrap";
import Router from "next/router";
import Layout from "../../components/layout";
import ProfileInfoForm from "../../components/Profile/ProfileInfoForm";
import { getProfile, removeProfile } from "../../src/Services/profile";
import Profile from "../../src/types/Profile";
import ProfileButton from "../../components/Profile/ProfileButton";
import OrderList from "../../components/Profile/OrderList";
import { getOrdersProfile } from "../../src/Services/order";
import Order from "../../src/types/Order";

class ProfilePage extends React.Component<
  { profile: Profile; orders: Order[]; session },
  { removedProfileAlert: boolean | null }
> {
  constructor(props) {
    super(props);
    this.state = { removedProfileAlert: null };
  }

  removeProfile = async () => {
    const { profile, session } = this.props;

    // TODO: validation

    const resp = await removeProfile(profile, session);

    if (resp) {
      this.setState({ removedProfileAlert: true });
    } else {
      this.setState({ removedProfileAlert: false });
    }
    signOut({ redirect: false });
  };

  render() {
    const { profile, orders } = this.props;
    const { removedProfileAlert } = this.state;
    return (
      <>
        {removedProfileAlert === null ? (
          <Layout title="Profile page">
            <h1>Profile Section</h1>
            <ProfileInfoForm profile={profile} />

            <ProfileButton profile={profile} removeProfile={this.removeProfile} />

            <h1>Order Section</h1>
            <OrderList orders={orders} />
          </Layout>
        ) : (
          <p />
        )}
        {removedProfileAlert === true ? (
          <Container>
            <Alert variant="success">
              <Alert.Heading>Profile removed Successfully!</Alert.Heading>
            </Alert>
            <Button variant="success" onClick={() => Router.push("/")}>
              Redirect to Home page
            </Button>
          </Container>
        ) : (
          <p />
        )}
        {removedProfileAlert === false ? (
          <Container>
            <Alert variant="danger">
              <Alert.Heading>Error in profile removal!</Alert.Heading>
            </Alert>
            <Button variant="primary" onClick={() => Router.push("/profile")}>
              Redirect to Profile page
            </Button>
          </Container>
        ) : (
          <p />
        )}
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
      session,
      orders: await getOrdersProfile(session, profile),
    },
  };
};

export default ProfilePage;
