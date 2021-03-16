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
}

export default DashboardModel;
