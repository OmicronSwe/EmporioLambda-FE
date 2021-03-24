import { Category } from "../../../src/objects/Category";
import { Product } from "../../../src/objects/Product";
import getlambdaResponse from "../lib/lambdas";

export const insertProduct = async (product: Product): Promise<boolean> => {
  const { response } = (await getlambdaResponse("product", "POST", JSON.stringify(product))).props;
  if (response.err !== null) return false;
  return true;
};

export const removeProduct = async (id: string) => {
  const { response } = (await getlambdaResponse(`product/${id}`, "DELETE")).props;
  if (response.err !== null) return false;
  return true;
};

export const getProducts = async (): Promise<Product[]> => {
  const response = (await getlambdaResponse("product", "GET")).props.response.result.items;
  return response;
};

// TODO: to type
export const updateProduct = async (id: string, params): Promise<boolean> => {
  const { response } = (await getlambdaResponse(`product/${id}`, "PUT", params)).props;
  if (response.err) return false;
  return true;
};

export const getProduct = async (id: string): Promise<Product> => {
  const response = (await getlambdaResponse(`product/${id}`, "GET")).props.response.result;
  return response;
};

export const insertCategory = async (category: Category): Promise<boolean> => {
  const { response } = (
    await getlambdaResponse("category", "POST", JSON.stringify(category))
  ).props;
  if (response.err) return false;
  return true;
};

export const removeCategory = async (name: string): Promise<boolean> => {
  const { response } = (await getlambdaResponse(`category/${name}`, "DELETE")).props;
  if (response.err) return false;
  return true;
};

export const getCategories = async (): Promise<Category[]> => {
  const response = (await getlambdaResponse("category", "GET")).props.response.result.items;
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
