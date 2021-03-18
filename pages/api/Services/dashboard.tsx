import getlambdaResponse from "../lib/lambdas";

export const insertProduct = async (params) => {
  const response = await getlambdaResponse("product", "POST", params);
  return response;
};

export const getProducts = async () => {
  const { response } = (await getlambdaResponse("product", "GET")).props;
  return response;
};

export const insertCategory = async (params) => {
  const response = await getlambdaResponse("category", "POST", params);
  return response;
};

export const removeCategory = async (name: string) => {
  const response = await getlambdaResponse(`category/${name}`, "DELETE");
  return response;
};

export const getCategories = async () => {
  const { response } = (await getlambdaResponse("category", "GET")).props;
  return response;
};
