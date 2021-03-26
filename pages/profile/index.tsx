import React from "react";
import { GetServerSideProps } from "next";

import { getSession } from "next-auth/client";
import Layout from "../../components/layout";
import ProfileForm from "../../components/Profile/ProfileForm"
import { getProfile } from "../api/Services/profile";
import { Profile } from "../../src/objects/Profile";

class ProfilePage extends React.Component<{ profile: Profile }> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { profile } = this.props;

    return (
      <>
        <Layout title="Profile page">
          <ProfileForm profile={profile}/>
        </Layout>
      </>
    );
  }
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  return {
    props: {
      profile: await getProfile(session)
    },
  };
};

export default ProfilePage;