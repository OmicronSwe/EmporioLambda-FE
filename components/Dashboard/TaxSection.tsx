import React from "react";
import { setTax } from "../../src/Services/dashboard";
import TaxForm from "./TaxForm";

class TaxSection extends React.Component<
  {
    tax: number;
    session;
  },
  {
    tax: number;
    taxChangedAlert: boolean;
  }
> {
  constructor(props) {
    super(props);
    const { tax } = this.props;
    this.state = { tax, taxChangedAlert: null };
  }

  insertTax = async (event) => {
    event.preventDefault();
    const { session } = this.props;
    const rate: number = event.target.rate.value;
    const result: boolean = await setTax(rate, session);
    this.setState({ taxChangedAlert: result });
    if (result === true) this.setState({ tax: rate });
  };

  handleChangedAlert = async () => {
    this.setState({ taxChangedAlert: null });
  };

  render() {
    const { tax, taxChangedAlert } = this.state;
    return (
      <>
        <h1 className="text-center mb-3">Tax Section</h1>
        <TaxForm
          tax={tax}
          taxChangedAlert={taxChangedAlert}
          handleChangedAlert={this.handleChangedAlert}
          insertTax={this.insertTax}
        />
      </>
    );
  }
}

export default TaxSection;
