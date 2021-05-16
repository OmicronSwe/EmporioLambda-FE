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
  { removedProfileAlert: boolean | null; updatedPasswordAlert: boolean | null; errors: Map<string, string> }
> {
  constructor(props) {
    super(props);
    this.state = { removedProfileAlert: null, updatedPasswordAlert: null, errors: new Map<string, string>() };
  }

  formValidation = (
    password: string
  ) => {
    const hasNumber = /\d/;
    const hasLowerCase = /[a-z]/;
    const hasUpperCase = /[A-Z]/;
    const isNumber = /^\d+$/;
    let isValid: boolean = true;
    const updatedErrors: Map<string, string> = new Map<string, string>();
    this.setState({ errors: updatedErrors, updatedPasswordAlert: null });

    if (!hasNumber.test(password)) {
      updatedErrors.set(
        "profilePasswordError",
        "The new password must contains numbers"
      );
      isValid = false;
    }
    if (hasLowerCase.test(password)) {
      updatedErrors.set(
        "profilePasswordError",
        "The new password must contains at least 1 uppercase letters"
      );
      isValid = false;
    }
    if (hasUpperCase.test(password)) {
      updatedErrors.set(
        "profilePasswordError",
        "The new password must contains at least 1 lowercase letters"
      );
      isValid = false;
    }
    if (isNumber.test(password)) {
      updatedErrors.set(
        "profilePasswordError",
        "The new password must contains at least 1 uppercase letters and 1 lowercase letters"
      );
      isValid = false;
    }
    if (password.length < 8) {
      updatedErrors.set(
        "profilePasswordError",
        "The new password must contains at least 8 characters"
      );
      isValid = false;
    }

    this.setState({ errors: updatedErrors });
    return isValid;
  }

  removeProfile = async () => {
    const { profile, session } = this.props;

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

    const password = event.target.newPassword.value;

    // Validation

    const isValid: boolean = this.formValidation(
      password
    );
    
    if(isValid) {
      const resp = await updatePassword(profile, session, password);

      if (resp) {
        this.setState({ updatedPasswordAlert: true });
      }
    }
  };

  render() {
    const { profile, orders } = this.props;
    const { removedProfileAlert, updatedPasswordAlert, errors } = this.state;
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
                    errors={errors}
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
