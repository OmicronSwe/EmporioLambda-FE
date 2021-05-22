import StoredProduct from "../types/StoredProduct";
import getlambdaResponse from "../../pages/api/lib/lambdas";
import { insertCart } from "./product";

export const getProductsByCategory = async (
  category: string,
  session
): Promise<StoredProduct[]> => {
  const { response } = (
    await getlambdaResponse(
      `product/search/category=${category}`,
      "GET",
      session ? session.accessToken : null
    )
  ).props;
  if (response.error || !response.result.items) return null;
  return response.result.items;
};

// This is needed, as there was a weird interation happening when the insertion of a product was being called in a parallel loop.
// The lambda function in the backend would fire correctly, but random products in the list weren't being added to dynamoDB

/* eslint-disable */

export const insertCartList = async (ids: string[], session) => {
  let finalResult : boolean = true;
  for (const id of ids) {
    let result: boolean = await insertCart(session, id, 1)
    if(result===false) finalResult = false;
  };

  return finalResult
};
/* eslint-enable */
