import getlambdaResponse from "../lib/lambdas";

export const insertProduct = async (params) => {
  const response = await getlambdaResponse("product", "POST", params);
  return response;
};

export const removeProduct = async (id: string) => {
  const response = await getlambdaResponse(`product/${id}`, "DELETE");
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

export const removeCategory = async (params) => {
  const response = await getlambdaResponse(`category`, "DELETE", params);
  return response;
};

export const getCategories = async () => {
  const { response } = (await getlambdaResponse("category", "GET")).props;
  return response;
};
