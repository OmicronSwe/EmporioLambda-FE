import React from 'react';
import { Button } from 'react-bootstrap';
import { injectStripe } from 'react-stripe-elements';
import getlambdaResponse from '../../pages/api/lib/lambdas';

class PayButtonContent extends React.Component<{
    stripe
}> {
    constructor(props) {
        super(props);
        this.state = {};
        this.handlePay = this.handlePay.bind(this)
    }

    async handlePay() {
        const body = {
            username:"31feb8cb-0bed-4589-833f-2a7b4b38c538",
            successurl: "http://localhost:3000/checkout",
            cancelurl: "http://localhost:3000/checkout"
        }
        const response = await getlambdaResponse(`createSessionStripe`, "POST", null, JSON.stringify(body))
        this.props.stripe.redirectToCheckout({
            // Make the id field from the Checkout Session creation API response
            // available to this file, so you can provide it as parameter here
            // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
            sessionId: response.props.response.sessionId
        }).then(function (result) {
            // If `redirectToCheckout` fails due to a browser or network
            // error, display the localized error message to your customer
            // using `result.error.message`.
            console.log(result)
        });
    }

    render() {
        return (
            <Button onClick={this.handlePay} >Pay </Button>
        );
    }
}

export default injectStripe(PayButtonContent);