import React from "react";
import DashboardController from "../../src/ViewController/DashboardController";
import DashboardViewModel from "../../src/ViewModel/DashboardViewModel";
import DashboardModel from "../../src/Model/DashboardModel";

class DashboardProvider extends React.Component<{}> {
  viewModel;

  constructor(props) {
    super(props);
    const listingProductModel = new DashboardModel();
    this.viewModel = new DashboardViewModel(listingProductModel);
  }

  render() {
    return <DashboardController viewModel={this.viewModel} />;
  }
}

export default DashboardProvider;
