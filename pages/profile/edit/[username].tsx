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
  { updatedProfileAlert: boolean | null; errors: Map<string, string> }
> {
  constructor(props) {
    super(props);
    this.state = { updatedProfileAlert: null, errors: new Map<string, string>() };
  }

  formValidation = (
    name: string,
    familyName: string,
    email: string,
    address: string
  ) => {
    const hasNumber = /\d/;
    const validateEmail = /\S+@\S+\.\S+/;
    let isValid: boolean = true;
    const updatedErrors: Map<string, string> = new Map<string, string>();
    this.setState({ errors: updatedErrors, updatedProfileAlert: null });

    if ( 
      name === "" &&
      familyName === "" &&
      email === "" &&
      address === ""
    ) {
      this.setState({ updatedProfileAlert: false });
      return false;
    }

    if (
      name !== "" &&
      hasNumber.test(name)
    ) {
      updatedErrors.set(
        "profileNameError",
        "The new name cannot contains numbers"
      );
      isValid = false;
    }
    if (
      name !== "" &&
      name.length < 2
    ) {
      updatedErrors.set(
        "profileNameError",
        "The new name must contains at least 2 characters"
      );
      isValid = false;
    }
    if (
      familyName !== "" &&
      hasNumber.test(familyName)
    ) {
      updatedErrors.set(
        "profileFamilyNameError",
        "The new family name cannot contains numbers"
      );
      isValid = false;
    }
    if (
      familyName !== "" &&
      familyName.length < 2
    ) {
      updatedErrors.set(
        "profileFamilyNameError",
        "The new family name must contains at least 2 characters"
      );
      isValid = false;
    }
    if (
      address !== "" &&
      address.length < 4
    ) {
      updatedErrors.set(
        "profileAddressError",
        "The new address must contains at least 4 characters"
      );
      isValid = false;
    }
    if (
      email !== "" &&
      !validateEmail.test(email)
    ) {
      updatedErrors.set(
        "profileEmailError",
        "The new email isn't in the right form (something@something.something)"
      );
      isValid = false;
    }

    this.setState({ errors: updatedErrors });
    return isValid;
  };

  updateProfile = async (event) => {
    event.preventDefault();
    const { profile, session } = this.props;

    let name = event.target.profileName.value 
      ? event.target.profileName.value 
      : "";
    let familyName = event.target.profileFamilyName.value
      ? event.target.profileFamilyName.value
      : "";
    let email = event.target.profileEmail.value 
      ? event.target.profileEmail.value 
      : "";
    let address = event.target.profileAddress.value
      ? event.target.profileAddress.value
      : "";

    // Validation

    const isValid: boolean = this.formValidation(
      name,
      familyName,
      email, 
      address
    );

    if(isValid) {
      const modifyedProfile = new Profile(
        profile.username, 
        address !== "" ? address : profile.address, 
        name !== "" ? name : profile.name, 
        familyName !== "" ? familyName : profile.family_name, 
        email !== "" ? email : profile.email);

        const resp = await updateProfile(modifyedProfile, session);

        if ( resp ) {
          this.setState({ updatedProfileAlert: true });
        }
    }    
  };

  render() {
    const { profile } = this.props;
    const { updatedProfileAlert, errors } = this.state;
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
                <ModifyingProfileForm updateProfile={this.updateProfile} errors={errors} />
              </Col>
            </Row>
            {updatedProfileAlert !== null && updatedProfileAlert === true ? (
              <Container>
                <Row className="justify-content-md-center mt-3">
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
                <Alert.Heading>
                  At least one field must be filled in to modify the profile
                </Alert.Heading>
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
