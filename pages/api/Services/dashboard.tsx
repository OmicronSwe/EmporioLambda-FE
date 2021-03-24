import { Category } from "../../../src/objects/Category";
import JustCreatedProduct from "../../../src/objects/JustCreatedProduct";
import StoredProduct from "../../../src/objects/StoredProduct";
import getlambdaResponse from "../lib/lambdas";

export const insertProduct = async (product: JustCreatedProduct, ses): Promise<boolean> => {
  const { response } = (
    await getlambdaResponse("product", "POST", ses.accessToken, JSON.stringify(product))
  ).props;
  if (response.err !== null) return false;
  return true;
};

export const removeProduct = async (id: string, ses) => {
  const { response } = (await getlambdaResponse(`product/${id}`, "DELETE", ses.accessToken)).props;
  if (response.err !== null) return false;
  return true;
};

export const getProducts = async (ses): Promise<StoredProduct[]> => {
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

export const getProduct = async (id: string, ses): Promise<StoredProduct> => {
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

export const fileToBase64 = async (file): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = () => resolve(btoa(reader.result.toString()));
    reader.onerror = (e) => reject(e);
  });
};
