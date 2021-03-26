import React from "react";
import Router from "next/router";
import {
  Button,
  Form,
  Row,
  Col,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";

class ModifyingProfileForm extends React.Component<{
  updateProfile
}> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { updateProfile } = this.props;
    return (
      <>
        <Form onSubmit={updateProfile}>
          <FormGroup as={Row}>
            <FormLabel column sm="5" htmlFor="profileName">
              New Name
            </FormLabel>
            <Col sm="6">
              <FormControl
                type="text"
                className="sm"
                id="profileName"
                name="profileName"
                placeholder="Name"
              />
            </Col>
          </FormGroup>
          <FormGroup as={Row}>
            <FormLabel column sm="5" htmlFor="profileFamilyName">
              New FamilyName
            </FormLabel>
            <Col sm="6">
              <FormControl
                className="sm"
                id="profileFamilyName"
                name="profileFamilyName"
                placeholder="FamilyName"
              />
            </Col>
          </FormGroup>         
          <FormGroup as={Row}>
            <FormLabel column sm="5" htmlFor="profileEmail">
              New Email
            </FormLabel>
            <Col sm="6">
              <FormControl
                className="sm"
                id="profileEmail"
                name="profileEmail"
                placeholder="Email"
              />
            </Col>
          </FormGroup>
          <FormGroup as={Row}>
            <FormLabel column sm="5" htmlFor="profileAddress">
              New Address
            </FormLabel>
            <Col sm="6">
              <FormControl
                className="sm"
                id="profileAddress"
                name="profileAddress"
                placeholder="Address"
              />
            </Col>
          </FormGroup>
          <Button type="submit" variant="primary">
            Submit
          </Button> {' '}
          <Button variant="danger" onClick={() => Router.push("/profile")}>
            Cancel
          </Button>
        </Form>
      </>
    );
  }
}

export default ModifyingProfileForm;