import React from "react";
import DashboardView from "../View/DashboardView";

class DashboardController extends React.Component<{ viewModel; products; session }> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  doModelAction = () => {
    const { viewModel } = this.props;
    viewModel.doModelAction();
  };

  render() {
    // da mostrare solo se utente loggato come venditore

    const { products } = this.props;
    return <DashboardView products={products} doModelAction={this.doModelAction} />;
  }
}

export default DashboardController;
