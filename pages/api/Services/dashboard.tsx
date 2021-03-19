
import { Category } from "../../../src/objects/Category";
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

export const insertCategory = async (category:Category) => {
  const { response } = (await getlambdaResponse("category", "POST", JSON.stringify(category))).props;
  if(response.err) return false
  return true
};

export const removeCategory = async (name: string) : Promise<boolean> => {
  const {response} = (await getlambdaResponse(`category/${name}`, "DELETE")).props;
  if(response.err) return false
  return true
};

export const getCategories = async () : Promise<Category[]> => {
  const res = (await getlambdaResponse("category", "GET")).props.response.result.items;
  return res
};
