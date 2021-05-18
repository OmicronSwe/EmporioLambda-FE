import React from "react";
import {
  Accordion,
  Button,
  Card,
  Row,
  Form,
  FormGroup,
  FormLabel,
  Col,
  FormControl,
  Alert,
} from "react-bootstrap";
import Router from "next/router";
import Profile from "../../src/types/Profile";

interface ProfileButtonProps {
  profile: Profile;
  removeProfile;
  updatePassword;
  updatedPasswordAlert: boolean;
  errors: Map<string, string>;
}

const ProfileButton = ({
  profile,
  removeProfile,
  updatePassword,
  updatedPasswordAlert,
  errors,
}: ProfileButtonProps) => {
  return (
    <>
      <Accordion>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="warning" eventKey="1">
              Edit Password
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
              <Form onSubmit={updatePassword}>
                <FormGroup as={Row}>
                  <FormLabel column sm="5" htmlFor="newPassword">
                    New Password
                  </FormLabel>
                  <Col sm="5">
                    <FormControl
                      type="text"
                      className="sm"
                      id="newPassword"
                      name="newPassword"
                      placeholder="New Password"
                    />
                    {errors.has("profilePasswordError") ? (
                      <small id="profilePasswordErrors" className="text-danger">
                        {errors.get("profilePasswordError")}
                      </small>
                    ) : (
                      <p />
                    )}
                  </Col>
                </FormGroup>
                <Form.Row className="text-center">
                  <Col sm="12">
                    <Button type="submit" variant="primary">
                      Submit
                    </Button>
                    {updatedPasswordAlert !== null && updatedPasswordAlert === true ? (
                      <Alert variant="success">
                        <Alert.Heading className="text-center">
                          Password edited Successfully!
                        </Alert.Heading>
                      </Alert>
                    ) : (
                      <p />
                    )}
                    {updatedPasswordAlert !== null && updatedPasswordAlert === false ? (
                      <Alert variant="danger">
                        <Alert.Heading className="text-center">
                          Error! Failed edit password!
                        </Alert.Heading>
                      </Alert>
                    ) : (
                      <p />
                    )}
                  </Col>
                </Form.Row>
              </Form>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header>
            <Button
              variant="warning"
              onClick={() => Router.push(`/profile/edit/${profile.username}`)}
            >
              Edit Profile
            </Button>
          </Card.Header>
        </Card>
        <Card>
          <Card.Header>
            <Button
              variant="danger"
              onClick={() => {
                removeProfile();
              }}
            >
              Delete Profile
            </Button>
          </Card.Header>
        </Card>
      </Accordion>
    </>
  );
};

export default ProfileButton;
