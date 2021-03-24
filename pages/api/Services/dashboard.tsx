import { Category } from "../../../src/objects/Category";
import { Product } from "../../../src/objects/Product";
import getlambdaResponse from "../lib/lambdas";

// TODO: to type
export const insertProduct = async (params, ses): Promise<boolean> => {
  const { response } = (await getlambdaResponse("product", "POST", ses.accessToken, params)).props;
  if (response.err) return false;
  return true;
};

// TODO: to type
export const removeProduct = async (id: string, ses) => {
  const response = await getlambdaResponse(`product/${id}`, "DELETE", ses.accessToken);
  return response;
};

export const getProducts = async (ses): Promise<Product[]> => {
  const response = (await getlambdaResponse("product", "GET", ses.accessToken)).props.response
    .result.items;
  return response;
};

// TODO: to type
export const updateProduct = async (id: string, params, ses): Promise<boolean> => {
  const { response } = (
    await getlambdaResponse(`product/${id}`, "PUT", ses.accessToken, params)
  ).props;
  if (response.err) return false;
  return true;
};

export const getProduct = async (id: string, ses): Promise<Product> => {
  const response = (await getlambdaResponse(`product/${id}`, "GET", ses.accessToken)).props.response
    .result;
  return response;
};

export const insertCategory = async (category: Category, ses): Promise<boolean> => {
  const { response } = (
    await getlambdaResponse("category", "POST", ses.accessToken, JSON.stringify(category))
  ).props;
  if (response.err) return false;
  return true;
};

export const removeCategory = async (name: string, ses): Promise<boolean> => {
  const { response } = (
    await getlambdaResponse(`category/${name}`, "DELETE", ses.accessToken)
  ).props;
  if (response.err) return false;
  return true;
};

export const getCategories = async (ses): Promise<Category[]> => {
  const response = (await getlambdaResponse("category", "GET", ses.accessToken)).props.response
    .result.items;
  return response;
};

export const fileToBase64 = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = () => resolve(btoa(reader.result.toString()));
    reader.onerror = (e) => reject(e);
  });
};
