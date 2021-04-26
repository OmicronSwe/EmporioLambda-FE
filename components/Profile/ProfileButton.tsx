import React from "react";
import { Button } from "react-bootstrap";
import Router from "next/router";
import { Profile } from "../../types/Profile";

class ProfileButton extends React.Component<{ profile: Profile; removeProfile }> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { profile, removeProfile } = this.props;

    return (
      <>
        <Button variant="warning" onClick={() => Router.push(`/profile/edit/${profile.username}`)}>
          Edit
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            removeProfile();
          }}
        >
          Delete
        </Button>
      </>
    );
  }
}

export default ProfileButton;
