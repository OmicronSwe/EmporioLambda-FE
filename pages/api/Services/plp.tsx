import { Product } from "../../../src/objects/Product";
import getlambdaResponse from "../lib/lambdas";


export const getProductsByCategory = async (category: string): Promise<Product[]> =>  {
    const { response } = (await getlambdaResponse(`product/search/category=${category}`, "GET")).props.response.result;
    console.log(response);
    return response;
  };