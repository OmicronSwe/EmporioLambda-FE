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
         <em>Products cost</em>:
        {" "+`€${cart.getProductsSum().toFixed(2)}`}
        <br />
        <em>Tax cost</em>:
        {" "+`${(cart.tax * 100).toString()}%`}
        <br />
        <b>Total cost</b>:
        {" "+`€${cart.getCartTotal().toFixed(2)}`}
      </div>
    </>
  );
};

export default SummaryInfo;
