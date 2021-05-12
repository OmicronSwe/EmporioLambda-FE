import React from "react";
import Cart from "../../src/types/Cart";

interface SummaryInfoProps{
  tax: number;
  cart: Cart;
}

const SummaryInfo = ({tax, cart}: SummaryInfoProps) => {
  return (
    <>
    <div id="summaryInfo">
      <br />
      Products cost:
      {`€${cart.getProductsSum().toString()}`}
      <br />
      Tax cost:
      {`${(tax * 100).toString()}%`}
      <br />
      Total cost:
      {`€${(cart.getProductsSum() + cart.getProductsSum() * tax).toFixed(2)}`}
    </div>
    </>
  );
}

/*class SummaryInfo extends React.Component<{ tax: number; cart: Cart }> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { tax, cart } = this.props;
    return (
      <>
      <div id="summaryInfo">
        <br />
        Products cost:
        {`€${cart.getProductsSum().toString()}`}
        <br />
        Tax cost:
        {`${(tax * 100).toString()}%`}
        <br />
        Total cost:
        {`€${(cart.getProductsSum() + cart.getProductsSum() * tax).toFixed(2)}`}
      </div>
      </>
    );
  }
}*/

export default SummaryInfo;
