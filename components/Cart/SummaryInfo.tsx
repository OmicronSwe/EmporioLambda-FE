import React from "react";
import Cart from "../../src/types/Cart";

class SummaryInfo extends React.Component<{tax: number; cart: Cart}>
{
    constructor(props) {
        super(props);
        this.state = {};
      }

    render(){
        const { tax, cart } = this.props
        return(
        <>
            <br />
            Products cost:
            {`€${cart.getProductsSum().toString()}`}
            <br />
            Tax cost:
            {`${(tax * 100).toString()}%`}
            <br />
            Total cost:
            {`€${(cart.getProductsSum() + cart.getProductsSum() * tax).toFixed(2)}`}
        </>
        )
    }
}

export default SummaryInfo