import React from "react";
import DashboardView from "../View/DashboardView";

class DashboardController extends React.Component<{ viewModel; products; session }> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  insertProduct = async (params) => {
    const { viewModel } = this.props;
    return viewModel.insertProduct(params);
  };

  doModelAction = () => {
    const { viewModel } = this.props;
    viewModel.doModelAction();
  };

  render() {
    const { products } = this.props;
    return <DashboardView products={products} insertProduct={this.insertProduct} doModelAction={this.doModelAction} />;
  }
}

export default DashboardController;
