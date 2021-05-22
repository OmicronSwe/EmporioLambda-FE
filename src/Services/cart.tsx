import { decode } from "jsonwebtoken";
import Cart from "../types/Cart";
import ProductInCart from "../types/ProductInCart";
import StoredProduct from "../types/StoredProduct";
import getlambdaResponse from "../../pages/api/lib/lambdas";

export const createEmptyCart = async (params): Promise<boolean> => {
  const JSONData = { username: decode(params.accessToken).sub, products: [] };
  try {
    const { response } = (
      await getlambdaResponse("cart/", "POST", params.accessToken, JSON.stringify(JSONData))
    ).props;
    if (response.error !== undefined) return false;
    return true;
  } catch (e) {
    return null;
  }
};

export const getProductsInCart = async (session): Promise<Cart> => {
  try {
    const { response } = (
      await getlambdaResponse(`cart/${decode(session.accessToken).sub}`, "GET", session.accessToken)
    ).props;
    if (response.error === "Cart not found") {
      if (createEmptyCart(session)) return new Cart([], 0);
      return null;
    }
    if (response.error !== undefined) {
      return null;
    }

    const productArray: ProductInCart[] = [];
    response.result.products.forEach((product) => {
      const stored = new StoredProduct(
        product.id,
        product.name,
        product.description,
        product.imageUrl,
        product.price,
        product.category
      );
      productArray.push(new ProductInCart(stored, product.quantity));
    });

    return new Cart(productArray, response.result.taxesApplied / 100);
  } catch (e) {
    return null;
  }
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
  try {
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
  } catch (e) {
    return null;
  }
};

export const removeAllProductsFromCart = async (session): Promise<boolean> => {
  try {
    const { response } = (
      await getlambdaResponse(
        `cart/toEmpty/${decode(session.accessToken).sub}`,
        "PUT",
        session.accessToken
      )
    ).props;
    if (response.error !== undefined) return false;
    return true;
  } catch (e) {
    return null;
  }
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
  try {
    const { response } = (
      await getlambdaResponse(
        `cart/addProduct/${decode(session.accessToken).sub}`,
        "PUT",
        session.accessToken,
        JSON.stringify(body)
      )
    ).props;
    if (response.error !== undefined) return false;
    return true;
  } catch (e) {
    return null;
  }
};

export const getProduct = async (id: string, session): Promise<StoredProduct> => {
  try {
    const { response } = (
      await getlambdaResponse(`product/${id}`, "GET", session ? session.accessToken : null)
    ).props;
    return response.result;
  } catch (e) {
    return null;
  }
};

export const getProductsFromLocalStorage = async (session): Promise<Cart> => {
  let tax: number;

  try {
    const { response } = (
      await getlambdaResponse(`tax/IVA`, "GET", session ? session.accessToken : null)
    ).props;
    tax = response.rate;
  } catch (e) {
    tax = 0;
  }

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
            new StoredProduct(
              res.id,
              res.name,
              res.description,
              res.imageUrl,
              res.price,
              res.category
            ),
            item.quantity
          );
          products.push(resTransform);
        })
      );
    }
    return new Cart(products, tax / 100);
  }
  return new Cart([], tax / 100);
};

// This is needed, as there was a weird interation happening when the insertion of a product was being called in a parallel loop.
// The lambda function in the backend would fire correctly, but random products in the list weren't being added to dynamoDB

/* eslint-disable */

export const addProductsFromLocalStorage = async (session): Promise<void> => {
  if (localStorage) {
    const jsonCart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart")).items
      : [];

    if (jsonCart) {
      for (const item of jsonCart) {
        await insertProductInCart(item.id, item.quantity, session);
      }
    }
  }
};
/* eslint-enable */
