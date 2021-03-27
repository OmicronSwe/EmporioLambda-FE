import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { GetServerSideProps } from "next";
import Router from "next/router";
import { getSession, Session } from "next-auth/client";
import Layout from "../../../components/layout";
import { getProfile, updateProfile } from "../../api/Services/profile";
import { Profile } from "../../../src/objects/Profile";
import ProfileInfoForm from "../../../components/Profile/ProfileInfoForm";
import ModifyingProfileForm from "../../../components/Profile/ModifyingProfileForm";

class EditProfile extends React.Component<{ profile: Profile; session }> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  updateProfile = async (event) => {
    event.preventDefault();
    const { profile, session } = this.props;

    // TODO: validation

    const name = event.target.profileName.value ? event.target.profileName.value : profile.name;
    const familyName = event.target.profileFamilyName.value
      ? event.target.profileFamilyName.value
      : profile.family_name;
    const email = event.target.profileEmail.value ? event.target.profileEmail.value : profile.email;
    const address = event.target.profileAddress.value
      ? event.target.profileAddress.value
      : profile.address;
    const modifyedProfile = new Profile(profile.username, address, name, familyName, email);

    await updateProfile(modifyedProfile, session);

    // redirect to profile
    Router.push("/profile");
    // TODO: success/error alert
  };

  render() {
    const { profile } = this.props;
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
                <ModifyingProfileForm updateProfile={this.updateProfile} />
              </Col>
            </Row>
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
