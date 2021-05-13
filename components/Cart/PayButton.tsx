import React from "react";
import { Elements, StripeProvider } from "react-stripe-elements";
import PayButtonContent from "./PayButtonContent";

declare global {
  interface Window {
    Stripe: any;
  }
}

export default class PayButton extends React.Component<{ username: string }, { stripe: string }> {
  constructor(props) {
    super(props);
    this.state = { stripe: null };
  }

  componentDidMount() {
    const stripeJs = document.createElement('script');
    stripeJs.src = 'https://js.stripe.com/v3/';
    stripeJs.async = true;
    stripeJs.onload = () => {
        this.setState({
          stripe: window.Stripe(process.env.NEXT_PUBLIC_STRIPE)
        })};
    document.body && document.body.appendChild(stripeJs);
  }

  render() {
    const { username } = this.props;
    const { stripe } = this.state;
    return (
      <div>
        {username ? (
          <StripeProvider stripe={stripe}>
            <Elements>
              <PayButtonContent username={username} />
            </Elements>
          </StripeProvider>
        ) : (
          ""
        )}
      </div>
    );
  }
}
