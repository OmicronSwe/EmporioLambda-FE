import React from "react";
import Cart from "../../src/types/Cart";

interface SummaryInfoProps {
  cart: Cart;
}

const SummaryInfo = ({ cart }: SummaryInfoProps) => {
  return (
    <>
      <div id="summaryInfo">
        <br />
        Products cost:
        {`€${cart.getProductsSum().toFixed(2)}`}
        <br />
        Tax cost:
        {`${(cart.tax * 100).toString()}%`}
        <br />
        Total cost:
        {`€${cart.getCartTotal().toFixed(2)}`}
      </div>
    </>
  );
};

export default SummaryInfo;
