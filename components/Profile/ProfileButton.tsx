import React from "react";
import { Button } from "react-bootstrap";
import Router from "next/router";
import Profile from "../../src/types/Profile";

interface ProfileButtonProps {
  profile: Profile;
  removeProfile;
}

const ProfileButton = ({ profile, removeProfile }: ProfileButtonProps) => {
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
};

export default ProfileButton;
