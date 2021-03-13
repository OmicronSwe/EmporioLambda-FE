import React from "react";
import DashboardView from "../View/DashboardView";

class DashboardController extends React.Component<{ viewModel }> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <DashboardView />;
  }
}

export default DashboardController;
