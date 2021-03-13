import Order from "./Objects/Order";
import Product from "./Objects/Product";

class DashboardModel {
  products: Product[] = null;

  categories: string[] = null;

  orders: Order[] = null;
}

export default DashboardModel;
