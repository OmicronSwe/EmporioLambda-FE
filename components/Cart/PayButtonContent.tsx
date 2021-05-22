import React from "react";
import { Button } from "react-bootstrap";
import { injectStripe } from "react-stripe-elements";
import getlambdaResponse from "../../pages/api/lib/lambdas";

class PayButtonContent extends React.Component<{
  stripe;
  username: string;
}> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handlePay = async () => {
    const { username, stripe } = this.props;
    const body = {
      username,
      successurl: `${process.env.NEXT_PUBLIC_SITE}/profile`,
      cancelurl: `${process.env.NEXT_PUBLIC_SITE}/cart`,
    };
    const response = await getlambdaResponse(
      `createSessionStripe`,
      "POST",
      null,
      JSON.stringify(body)
    );

    if (response.props.response.error) {
      window.location.href = `/cart?error=${response.props.response.error}`;
    }

    if (response.props.response.sessionId) {
      stripe.redirectToCheckout({
        sessionId: response.props.response.sessionId,
      });
    }
  };

  render() {
    return <Button onClick={this.handlePay}>Pay </Button>;
  }
}

export default injectStripe(PayButtonContent);
