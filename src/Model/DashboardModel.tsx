import Order from "./Objects/Order";
import Product from "./Objects/Product";

import getlambdaResponsePOST from "../../pages/api/lib/lambdas";

class DashboardModel {
  products: Product[] = null;

  categories: string[] = null;

  orders: Order[] = null;

  async doModelAction() {
    const stringJson = JSON.stringify({
      // payload for API
      name: "test",
      condition: "getByName",
    });

    const resp = await getlambdaResponsePOST("product/query", "POST", stringJson); // external API call
    console.log(resp.props.response);
    this.orders = null;
  }
}

export default DashboardModel;
