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

export const insertCart = async (session, id: string, quantity: number): Promise<boolean> => {
  if (session) {
    // authenticated
    const stringJSON = JSON.stringify({
      id,
      quantity,
    });

    try {
      const { response } = (
        await getlambdaResponse(
          `cart/addProduct/${decode(session.accessToken).sub}`,
          "PUT",
          session ? session.accessToken : null,
          stringJSON
        )
      ).props;
      if (response.error !== undefined) return false;
      return true;
    } catch (e) {
      return false;
    }
  } else {
    // not authenticated -> add product to localstorage
    const cart = localStorage.getItem("cart"); // retrieve cart
    let jsonCart;

    if (cart != null) {
      try {
        jsonCart = JSON.parse(cart);

        let change: boolean = false;
        for (let i = 0; i < jsonCart.items.length; i += 1) {
          // look for the entry with a matching code value
          if (jsonCart.items[i].id === id) {
            jsonCart.items[i].quantity += quantity;
            change = true;
          }
        }
        if (!change) {
          jsonCart.items.push({ id, quantity }); // push new id to the cart
        }
      } catch (error) {
        jsonCart = {
          items: [],
        };

        jsonCart.items.push({ id, quantity });
      }
    } else {
      jsonCart = {
        items: [],
      };
    }

    try {
      localStorage.setItem("cart", JSON.stringify(jsonCart)); // update localstorage
      return true;
    } catch (error) {
      return false;
    }
  }
};

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
