import React from "react";
import { GetServerSideProps } from "next";
import { getSession, signOut } from "next-auth/client";
import { Alert, Button, Col, Container, Row } from "react-bootstrap";
import Router from "next/router";
import Layout from "../../components/layout";
import ProfileInfoForm from "../../components/Profile/ProfileInfoForm";
import { getProfile, removeProfile, updatePassword } from "../../src/Services/profile";
import Profile from "../../src/types/Profile";
import ProfileButton from "../../components/Profile/ProfileButton";
import OrderList from "../../components/Profile/OrderList";
import { getOrdersProfile } from "../../src/Services/order";
import Order from "../../src/types/Order";

class ProfilePage extends React.Component<
  { profile: Profile; orders: Order[]; session },
  { removedProfileAlert: boolean | null; updatedPasswordAlert: boolean | null }
> {
  constructor(props) {
    super(props);
    this.state = { removedProfileAlert: null, updatedPasswordAlert: null };
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

  updatePassword = async (event) => {
    event.preventDefault();
    const { profile, session } = this.props;

    // TODO: validation
    const password = event.target.newPassword.value;

    const resp = await updatePassword(profile, session, password);

    if (resp) {
      this.setState({ updatedPasswordAlert: true });
    } else {
      this.setState({ updatedPasswordAlert: false });
    }
    console.log(resp);
  };

  render() {
    const { profile, orders } = this.props;
    const { removedProfileAlert, updatedPasswordAlert } = this.state;
    return (
      <>
        {removedProfileAlert === null ? (
          <Layout title="Profile page">
            <Container>
              <Row className="justify-content-md-center">
                <h1>Profile section</h1>
              </Row>
              <Row>
                <Col>
                  <ProfileInfoForm profile={profile} />
                </Col>
                <Col>
                  <ProfileButton
                    profile={profile}
                    removeProfile={this.removeProfile}
                    updatePassword={this.updatePassword}
                    updatedPasswordAlert={updatedPasswordAlert}
                  />
                </Col>
              </Row>

              <Row className="justify-content-md-center">
                <h1>Order section</h1>
              </Row>
              <OrderList orders={orders} />
            </Container>
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
