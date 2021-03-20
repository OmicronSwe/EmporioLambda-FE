import React from "react";
import { Col, Form, Row } from "react-bootstrap";

class ProfileForm extends React.Component<{ session }> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { session } = this.props;
    //const item = product.result;
    return (
      <>
        <h1>Profile Section</h1>
        <Form>
          <Form.Group as={Row} controlId="formPlainTextName">
            <Form.Label column lg="3">
              Name
            </Form.Label>
            <Col sm="9">
              <Form.Control plaintext readOnly defaultValue={session.user.name} />
            </Col>
          </Form.Group>
        </Form>
      </>
    );
  }
}

export default ProfileForm;