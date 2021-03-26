import React from "react";
import { Button } from "react-bootstrap";
import { Profile } from "../../src/objects/Profile";
import Router from "next/router";

class ProfileButton extends React.Component<{ profile: Profile }> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { profile} = this.props;

    return (
      <>
        <Button variant="warning" onClick={() => Router.push(`/profile/edit/${profile.username}`)}>Edit</Button>{' '}
        <Button variant="danger">Delete</Button>
      </>
    );
  }
}

export default ProfileButton;