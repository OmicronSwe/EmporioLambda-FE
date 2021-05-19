import { decode } from "jsonwebtoken";
import StoredProduct from "../types/StoredProduct";
import getlambdaResponse from "../../pages/api/lib/lambdas";

export const getProduct = async (id: string, ses): Promise<StoredProduct> => {
  try {
    const { response } = (
      await getlambdaResponse(`product/${id}`, "GET", ses ? ses.accessToken : undefined)
    ).props;

    if (response.error || !response.result) return null;
    return response.result;
  } catch (error) {
    return null;
  }
};
/* eslint-disable */
export const insertCart = async (
  session,
  product: StoredProduct,
  quantity: number
): Promise<boolean> => {
  if (session) {
    // authenticated
    const stringJSON = JSON.stringify({
      id: product.id,
      quantity,
    });

    try {
      console.log(decode(session.accessToken).sub)
      console.log(session)
      console.log(stringJSON)
      const { response } = (
        await getlambdaResponse(
          `cart/addProduct/${decode(session.accessToken).sub}`,
          "PUT",
          session ? session.accessToken : null,
          stringJSON
        )
      ).props;
      console.log(response)
      if (response.error !== undefined) return false;
      return true;
    } catch (e) {
      return null;
    }
  } else {
    // not authenticated -> add product to localstorage
    const cart = localStorage.getItem("cart"); // retrieve cart
    let jsonCart;

    if (cart != null) {
      try {
        jsonCart = JSON.parse(cart);
      } catch (error) {
        jsonCart = {
          items: [],
        };
      }
    } else {
      jsonCart = {
        items: [],
      };
    }

    let change: boolean = false;
    for (let i = 0; i < jsonCart.items.length; i += 1) {
      // look for the entry with a matching code value
      if (jsonCart.items[i].id === product.id) {
        jsonCart.items[i].quantity += quantity;
        change = true;
      }
    }
    if (!change) {
      jsonCart.items.push({ id: product.id, quantity }); // push new id to the cart
    }
    try {
      localStorage.setItem("cart", JSON.stringify(jsonCart)); // update localstorage
      return true;
    } catch (error) {
      return false;
    }
  }
};
/* eslint-enable*/

export const getProductsFiltered = async (
  name,
  category,
  minPrice,
  maxPrice,
  ses
): Promise<StoredProduct[]> => {
  let searchInput: string = "";

  if (name) {
    searchInput += `name=${encodeURI(name)}&`;
  }

  if (minPrice) {
    searchInput += `minprice=${minPrice}&`;
  }

  if (maxPrice) {
    searchInput += `maxprice=${maxPrice}&`;
  }

  if (category) {
    searchInput += `category=${encodeURI(category)}&`;
  }

  searchInput = searchInput.slice(0, -1);

  const { response } = (
    await getlambdaResponse(
      `product/search/${searchInput}`,
      "GET",
      ses ? ses.accessToken : undefined
    )
  ).props;
  if (response.error) return null;
  return response.result.items;
};
