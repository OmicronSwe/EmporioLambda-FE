import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import Profile from "../../src/types/Profile";

interface ProfileFormProps {
  profile: Profile;
}

const ProfileForm = ({ profile }: ProfileFormProps) => {
  return (
    <>
      <Form>
        <Form.Group as={Row} controlId="formPlainTextName">
          <Form.Label column lg="3">
            <strong> Name </strong>
          </Form.Label>
          <Col sm="9">
            <Form.Control plaintext readOnly defaultValue={profile.name} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formPlainTextFamilyName">
          <Form.Label column lg="3">
            <strong> Family Name </strong>
          </Form.Label>
          <Col sm="9">
            <Form.Control plaintext readOnly defaultValue={profile.family_name} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formPlainTextEmail">
          <Form.Label column lg="3">
            <strong> Email </strong>
          </Form.Label>
          <Col sm="9">
            <Form.Control plaintext readOnly defaultValue={profile.email} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formPlainTextAddress">
          <Form.Label column lg="3">
            <strong> Address </strong>
          </Form.Label>
          <Col sm="9">
            <Form.Control plaintext readOnly defaultValue={profile.address} />
          </Col>
        </Form.Group>
      </Form>
    </>
  );
};

export default ProfileForm;
