import { Order } from "../../../src/objects/Order";
import getlambdaResponse from "../lib/lambdas";

export const getOrderDetails = async (id: string, ses): Promise<Order> => {
  const response = await (await getlambdaResponse(`order/${id}`, "GET", ses.accessToken)).props
    .response.result;
  return response;
};

export const getOrders = async (ses): Promise<Order[]> => {
  const response = await (await getlambdaResponse("order", "GET", ses.accessToken)).props.response;
  if (response.error) return null;
  return response.result.items;
};
