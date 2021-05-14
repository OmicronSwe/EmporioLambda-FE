import React from "react";
import Router from "next/router";
import { Button, Form, Row, Col, FormControl, FormGroup, FormLabel, Alert } from "react-bootstrap";

interface ModifyingProfileFormProps {
  updateProfile;
  updatedProfileAlert: boolean;
}

const ModifyingProfileForm = ({ updateProfile, updatedProfileAlert }: ModifyingProfileFormProps) => {
  let setShow: boolean = true;
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
            <FormControl className="sm" id="profileEmail" name="profileEmail" placeholder="Email" />
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
        </Button>
        <Button variant="danger" onClick={() => Router.push("/profile")}>
          Cancel
        </Button>
        {updatedProfileAlert !== null && updatedProfileAlert === true ? (
          <Alert variant="success" onClose={() => setShow=false} dismissible>
            <Alert.Heading> Profile edited Successfully! </Alert.Heading>
          </Alert>
        ) : (
          <p />
        )}
      </Form>
    </>
  );
};

export default ModifyingProfileForm;
