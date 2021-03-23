import React from "react";
import { GetServerSideProps } from "next";

import { getSession } from "next-auth/client";
import Layout from "../../components/layout";
import ProfileForm from "../../components/Profile/ProfileForm"

class ProfilePage extends React.Component<{ session }> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { session } = this.props;
    if (!session)
        return (
            <>
                <Layout title="Profile page">
                <h4>User not authenticated</h4>
                </Layout>
            </>
        );
    return (
      <>
        <Layout title="Profile page">
          <ProfileForm session={session}/>
        </Layout>
      </>
    );
  }
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return {
    props: {
      session: await getSession({ req })
    },
  };
};

export default ProfilePage;