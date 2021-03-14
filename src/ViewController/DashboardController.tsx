import React from "react";
import DashboardView from "../View/DashboardView";

class DashboardController extends React.Component<{ viewModel; products; session }> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // da mostrare solo se utente loggato come venditore
    const products = this.props;
    return <DashboardView products={products} />;
  }
}

export default DashboardController;
