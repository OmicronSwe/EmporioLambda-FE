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

export const getProductsInCart = async (session): Promise<ProductInCart[]> => {
  const { response } = (
    await getlambdaResponse(`cart/${decode(session.accessToken).sub}`, "GET", session.accessToken)
  ).props;
  if (response.error === "Cart not found") {
    if (createEmptyCart(session)) return [];
    return null;
  }
  if (response.error !== undefined) {
    return null;
  }
  return response.result;
};

export const removeProductFromCart = async (
  id: string,
  session,
  quantity: number = null
): Promise<boolean> => {
  let body;
  if (quantity) {
    body = {
      id,
      quantity,
    };
  } else {
    body = {
      id,
    };
  }

  const { response } = (
    await getlambdaResponse(
      `cart/removeProduct/${decode(session.accessToken).sub}`,
      "PUT",
      session.accessToken,
      JSON.stringify(body)
    )
  ).props;
  if (response.error !== undefined) return false;
  return true;
};

export const removeAllProductsFromCart = async (session): Promise<boolean> => {
  const { response } = (
    await getlambdaResponse(
      `cart/toEmpty/${decode(session.accessToken).sub}`,
      "PUT",
      session.accessToken
    )
  ).props;
  if (response.error !== undefined) return false;
  return true;
};

export const insertProductInCart = async (
  id: string,
  quantity: number,
  session
): Promise<boolean> => {
  const body = {
    id,
    quantity,
  };
  const { response } = (
    await getlambdaResponse(
      `cart/addProduct/${decode(session.accessToken).sub}`,
      "PUT",
      session,
      JSON.stringify(body)
    )
  ).props;
  if (response.error !== undefined) return false;
  return true;
};

export const getProduct = async (id: string, session): Promise<StoredProduct> => {
  const { response } = (
    await getlambdaResponse(`product/${id}`, "GET", session ? session.accessToken : null)
  ).props;
  return response.result;
};

export const getProductsFromLocalStorage = async (session): Promise<ProductInCart[]> => {
  if (localStorage) {
    const products: ProductInCart[] = [];
    const jsonCart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart")).items
      : [];

    if (jsonCart) {
      await Promise.all(
        jsonCart.map(async (item) => {
          const res = await getProduct(item.id, session);
          const resTransform = new ProductInCart(
            res.id,
            res.name,
            res.price,
            res.description,
            res.imageUrl,
            item.quantity
          );
          products.push(resTransform);
        })
      );
    }
    return products;
  }
  return [];
};