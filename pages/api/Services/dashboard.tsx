
import { Category } from "../../../src/objects/Category";
import { Product } from "../../../src/objects/Product";
import getlambdaResponse from "../lib/lambdas";

//TODO: to type
export const insertProduct = async (params) => {
  const response = await getlambdaResponse("product", "POST", params);
  return response;
};

//TODO: to type
export const removeProduct = async (id: string) => {
  const response = await getlambdaResponse(`product/${id}`, "DELETE");
  return response;
};

export const getProducts = async () : Promise<Product[]> => {
  const response = (await getlambdaResponse("product", "GET")).props.response.result.items;
  return response;
};

export const insertCategory = async (category: Category) : Promise<boolean> => {
  const { response } = (await getlambdaResponse("category", "POST", JSON.stringify(category))).props;
  if(response.err) return false
  return true
};

export const removeCategory = async (name: string) : Promise<boolean> => {
  const { response } = (await getlambdaResponse(`category/${name}`, "DELETE")).props;
  if(response.err) return false
  return true
};

export const getCategories = async () : Promise<Category[]> => {
  const response = (await getlambdaResponse("category", "GET")).props.response.result.items;
  return response
};

export const fileToBase64 = async (file) => {
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (e) => reject(e);
  });
};
