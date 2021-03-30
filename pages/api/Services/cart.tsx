import { decode } from "jsonwebtoken";
import ProductInCart from "../../../src/objects/ProductInCart";
import StoredProduct from "../../../src/objects/StoredProduct";
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

export const getProduct = async (id: string, session): Promise<StoredProduct> => {
  const response = (
    await getlambdaResponse(`product/${id}`, "GET", session ?  session.accessToken : null)
  ).props.response;
  return response.result;
};

export const getProductsFromLocalStorage = async (session) => {
  if(localStorage){
    let products : ProductInCart[] = []
    let jsonCart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")).items : []

    if(jsonCart){
      for (let i = 0; i < jsonCart.length; i++) {
        const item = jsonCart[i];
        const res : StoredProduct = await getProduct(item.id, session)
        const resTransform = await new ProductInCart(res.id, res.name, res.price, res.description, res.imageUrl, item.quantity)
        products.push(await resTransform)
      }
    }
    return products
  }
};
