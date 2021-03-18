import getlambdaResponse from "../lib/lambdas";

export const getOrderDetails = async (id) => {
  const response = await getlambdaResponse(`order/${id}`, "GET");
  return response;
};

export const getOrders = async () => {
  const response = await getlambdaResponse("order", "GET");
  return response;
};
