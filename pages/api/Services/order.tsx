import { Order } from "../../../src/objects/Order";
import { Profile } from "../../../src/objects/Profile";
import getlambdaResponse from "../lib/lambdas";

export const getOrderDetails = async (id: string, ses): Promise<Order> => {
  const response = await (await getlambdaResponse(`order/${id}`, "GET", ses.accessToken)).props
    .response.result;
  return response;
};

export const getOrders = async (ses, profile: Profile): Promise<Order[]> => {
  const response = await (await getlambdaResponse(`order/getByUsername/${profile.username}`, "GET", ses.accessToken)).props.response;
  if (response.error) return null;
  return response.result.items;
};