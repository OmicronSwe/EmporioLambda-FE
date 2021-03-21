import { Order } from "../../../src/objects/Order";
import getlambdaResponse from "../lib/lambdas";

export const getOrderDetails = async (id: string): Promise<Order> => {
  const response = await (await getlambdaResponse(`order/${id}`, "GET")).props.response.result
    .items;
  return response;
};

export const getOrders = async (): Promise<Order[]> => {
  const response = await (await getlambdaResponse("order", "GET")).props.response;
  if (response.error) return null;
  return response.result.items;
};
