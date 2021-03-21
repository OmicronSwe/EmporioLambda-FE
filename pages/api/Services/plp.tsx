import { Product } from "../../../src/objects/Product";
import getlambdaResponse from "../lib/lambdas";

const getProductsByCategory = async (category: string): Promise<Product[]> => {
  const response = (await getlambdaResponse(`product/search/category=${category}`, "GET")).props
    .response.result.items;
  return response;
};

export default getProductsByCategory;
