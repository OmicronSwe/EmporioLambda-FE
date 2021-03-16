import Order from "./Objects/Order";
import Product from "./Objects/Product";
import getlambdaResponse from "../../pages/api/lib/lambdas";

class DashboardModel {
  products: Product[] = null;

  categories: string[] = null;

  orders: Order[] = null;

  insertProduct = async (params) => {
    const response = await getlambdaResponse("product", "POST", params);
    return response;
  };

  async doModelAction() {
    const stringJson = JSON.stringify({
      // payload for API
      name: "test",
      condition: "getByName",
    });

    const resp = await getlambdaResponse("product/query", "POST", stringJson); // external API call
    // eslint-disable-next-line no-console
    console.log(resp.props.response);
    this.orders = null;
  }
}

export default DashboardModel;
