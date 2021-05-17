import React from "react";
import Router from "next/router";
import { Button, Form, Row, Col, FormControl, FormGroup, FormLabel } from "react-bootstrap";

interface ModifyingProfileFormProps {
  updateProfile;
  errors: Map<string, string>;
}

const ModifyingProfileForm = ({ updateProfile, errors }: ModifyingProfileFormProps) => {
  return (
    <>
      <Form onSubmit={updateProfile}>
        <FormGroup as={Row}>
          <FormLabel column sm="5" htmlFor="profileName">
            <strong> New Name </strong>
          </FormLabel>
          <Col sm="6">
            <FormControl
              type="text"
              className="sm"
              id="profileName"
              name="profileName"
              placeholder="Name"
            />
            {errors.has("profileNameError") ? (
              <small id="profileNameErrors" className="text-danger">
                {errors.get("profileNameError")}
              </small>
            ) : (
              <p />
            )}
          </Col>
        </FormGroup>
        <FormGroup as={Row}>
          <FormLabel column sm="5" htmlFor="profileFamilyName">
            <strong> New FamilyName </strong>
          </FormLabel>
          <Col sm="6">
            <FormControl
              className="sm"
              id="profileFamilyName"
              name="profileFamilyName"
              placeholder="FamilyName"
            />
            {errors.has("profileFamilyNameError") ? (
              <small id="profileFamilyNameErrors" className="text-danger">
                {errors.get("profileFamilyNameError")}
              </small>
            ) : (
              <p />
            )}
          </Col>
        </FormGroup>
        <FormGroup as={Row}>
          <FormLabel column sm="5" htmlFor="profileEmail">
            <strong> New Email </strong>
          </FormLabel>
          <Col sm="6">
            <FormControl className="sm" id="profileEmail" name="profileEmail" placeholder="Email" />
            {errors.has("profileEmailError") ? (
              <small id="profileEmailErrors" className="text-danger">
                {errors.get("profileEmailError")}
              </small>
            ) : (
              <p />
            )}
          </Col>
        </FormGroup>
        <FormGroup as={Row}>
          <FormLabel column sm="5" htmlFor="profileAddress">
            <strong> New Address </strong>
          </FormLabel>
          <Col sm="6">
            <FormControl
              className="sm"
              id="profileAddress"
              name="profileAddress"
              placeholder="Address"
            />
            {errors.has("profileAddressError") ? (
              <small id="profileAddressErrors" className="text-danger">
                {errors.get("profileAddressError")}
              </small>
            ) : (
              <p />
            )}
          </Col>
        </FormGroup>
        <Button type="submit" variant="primary">
          Submit
        </Button>
        <Button variant="danger" onClick={() => Router.push("/profile")}>
          Cancel
        </Button>
      </Form>
    </>
  );
};

export default ModifyingProfileForm;
