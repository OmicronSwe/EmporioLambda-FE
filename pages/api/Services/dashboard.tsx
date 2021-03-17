import getlambdaResponse from "../lib/lambdas";

export const insertProduct = async (params) => {
  const response = await getlambdaResponse("product", "POST", params);
  return response;
};

export const getProducts = async () => {
  const { response } = (await getlambdaResponse("product", "GET")).props;
  return response;
};
