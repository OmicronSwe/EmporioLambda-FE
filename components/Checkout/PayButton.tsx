import React from "react";
import { Elements, StripeProvider } from 'react-stripe-elements';
import PayButtonContent from './PayButtonContent';

export default class PayButton extends React.Component<{

}> {
    render() {
        return (
            <StripeProvider apiKey="pk_test_51IKmlMD3EkUVsrZSkw087cLRNeODEpLFQAhLX24GJiVikK5RYoNNk7HBZ5upPgWEWC5PNbdoj8zzMeTrTRCAq2Lm00Y6RuKL6W">
                <Elements>
                    <PayButtonContent/>
                </Elements>
            </StripeProvider>
        );
    }
}