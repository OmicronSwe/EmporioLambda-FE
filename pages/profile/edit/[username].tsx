import React from "react";
import { Row, Col, Container, Button, Alert } from "react-bootstrap";
import { GetServerSideProps } from "next";
import Router from "next/router";
import { getSession, Session } from "next-auth/client";
import Layout from "../../../components/layout";
import { getProfile, updateProfile } from "../../../src/Services/profile";
import Profile from "../../../src/types/Profile";
import ProfileInfoForm from "../../../components/Profile/ProfileInfoForm";
import ModifyingProfileForm from "../../../components/Profile/ModifyingProfileForm";

class EditProfile extends React.Component<
  { profile: Profile; session },
  { updatedProfileAlert: boolean | null }
> {
  constructor(props) {
    super(props);
    this.state = { updatedProfileAlert: null };
  }

  updateProfile = async (event) => {
    event.preventDefault();
    const { profile, session } = this.props;
    let empty: boolean = true;

    // TODO: validation

    const name = event.target.profileName.value ? event.target.profileName.value : profile.name;
    if (name !== profile.name) {
      empty = false;
    }
    const familyName = event.target.profileFamilyName.value
      ? event.target.profileFamilyName.value
      : profile.family_name;
    if (familyName !== profile.family_name) {
      empty = false;
    }
    const email = event.target.profileEmail.value ? event.target.profileEmail.value : profile.email;
    if (email !== profile.email) {
      empty = false;
    }
    const address = event.target.profileAddress.value
      ? event.target.profileAddress.value
      : profile.address;
    if (address !== profile.address) {
      empty = false;
    }
    const modifyedProfile = new Profile(profile.username, address, name, familyName, email);

    const resp = await updateProfile(modifyedProfile, session);

    if (!resp || empty) {
      this.setState({ updatedProfileAlert: false });
    } else {
      this.setState({ updatedProfileAlert: true });
    }
  };

  render() {
    const { profile } = this.props;
    const { updatedProfileAlert } = this.state;
    return (
      <>
        <Layout title="Profile edit page">
          <Container>
            <Row className="justify-content-md-center">
              <h1>Profile edit</h1>
            </Row>
            <Row>
              <Col>
                <ProfileInfoForm profile={profile} />
              </Col>
              <Col>
                <ModifyingProfileForm
                  updateProfile={this.updateProfile}
                />
              </Col>
            </Row>
            {updatedProfileAlert !== null && updatedProfileAlert === true ? (
              <Container>
                <Row className="justify-content-md-center mt-3" >
                  <Alert variant="success">
                    <Alert.Heading> Profile edited Successfully! </Alert.Heading>
                  </Alert>
                </Row>
                <Row className="justify-content-md-center">
                  <Button variant="success" onClick={() => Router.push("/profile")}>
                    Redirect to Profile page
                  </Button>
                </Row>
              </Container>
            ) : (
              <p />
            )}
            {updatedProfileAlert !== null && updatedProfileAlert === false ? (
              <Alert variant="danger">
                <Alert.Heading> <p className="text-center"> At least one field must be filled in to modify the profile </p></Alert.Heading>
              </Alert>
            ) : (
              <p />
            )}
          </Container>
        </Layout>
      </>
    );
  }
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session: Session = await getSession({ req });
  if (session === undefined) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      profile: await getProfile(session),
      session,
    },
  };
};

export default EditProfile;
