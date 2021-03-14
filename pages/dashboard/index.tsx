import React from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import getlambdaResponse from "../api/lib/lambdas";
import DashboardController from "../../src/ViewController/DashboardController";
import DashboardViewModel from "../../src/ViewModel/DashboardViewModel";
import DashboardModel from "../../src/Model/DashboardModel";

class DashboardProvider extends React.Component<{ products; session }> {
  viewModel: DashboardViewModel;

  constructor(props) {
    super(props);
    const dashboardModel = new DashboardModel();
    this.viewModel = new DashboardViewModel(dashboardModel);
  }

  render() {
    const { products, session } = this.props;
    return <DashboardController viewModel={this.viewModel} products={products} session={session} />;
  }
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return {
    props: {
      products: await (await getlambdaResponse("product", "GET")).props.response,
      session: await getSession({ req }),
    },
  };
};

export default DashboardProvider;
