import { decode } from "jsonwebtoken";
import ProductInCart from "../../../src/objects/ProductInCart";
import getlambdaResponse from "../lib/lambdas";

export const createEmptyCart = async (params): Promise<boolean> => {
  const JSONData = { username: decode(params.accessToken).sub, products: [] };
  const { response } = (
    await getlambdaResponse("cart/", "POST", params.accessToken, JSON.stringify(JSONData))
  ).props;
  if (response.error !== undefined) return false;
  return true;
};

export const getProductsInCart = async (params): Promise<ProductInCart[]> => {
  const { response } = (
    await getlambdaResponse(`cart/${decode(params.accessToken).sub}`, "GET", params.accessToken)
  ).props;
  if (response.error === "Cart not found") {
    if (createEmptyCart(params)) return [];
    return null;
  }
  if (response.error !== undefined) {
    return null;
  }
  return response.result;
};

export const removeProductFromCart = async (params): Promise<boolean> => {
  const { response } = (
    await getlambdaResponse(
      `cart/removeProduct/${decode(params.auth.accessToken).sub}`,
      "PUT",
      params.auth.accessToken,
      JSON.stringify(params.body)
    )
  ).props;
  if (response.error !== undefined) return false;
  return true;
};

export const removeAllProductsFromCart = async (params): Promise<boolean> => {
  const { response } = (
    await getlambdaResponse(
      `cart/toEmpty/${decode(params.accessToken).sub}`,
      "PUT",
      params.accessToken
    )
  ).props;
  if (response.error !== undefined) return false;
  return true;
};

export const insertProductInCart = async (params): Promise<boolean> => {
  const { response } = (
    await getlambdaResponse(
      `cart/addProduct/${decode(params.auth.accessToken).sub}`,
      "PUT",
      params.auth.accessToken,
      JSON.stringify(params.body)
    )
  ).props;
  if (response.error !== undefined) return false;
  return true;
};

export const getProduct = async (params) => {
  const { response } = (
    await getlambdaResponse(`product/${params}`, "GET", params.accessToken)
  ).props.response.result;
  return response;
};
