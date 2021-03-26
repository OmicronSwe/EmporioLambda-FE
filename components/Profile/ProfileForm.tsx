import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import { Profile } from "../../src/objects/Profile";

class ProfileForm extends React.Component<{ profile: Profile }> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { profile } = this.props;

    console.log(profile); 
    return (
      <>
        <h1>Profile Section</h1>
        <Form>
          <Form.Group as={Row} controlId="formPlainTextName">
            <Form.Label column lg="3">
              Name
            </Form.Label>
            <Col sm="9">
              <Form.Control plaintext readOnly defaultValue={profile.name} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPlainTextFamilyName">
            <Form.Label column lg="3">
              Family Name
            </Form.Label>
            <Col sm="9">
              <Form.Control plaintext readOnly defaultValue={profile.family_name} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPlainTextEmail">
            <Form.Label column lg="3">
              Email
            </Form.Label>
            <Col sm="9">
              <Form.Control plaintext readOnly defaultValue={profile.email} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPlainTextAddress">
            <Form.Label column lg="3">
              Address
            </Form.Label>
            <Col sm="9">
              <Form.Control plaintext readOnly defaultValue={profile.address} />
            </Col>
          </Form.Group>
        </Form>
      </>
    );
  }
}

export default ProfileForm;