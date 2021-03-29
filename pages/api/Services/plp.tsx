import { decode } from "jsonwebtoken";
import StoredProduct from "../../../src/objects/StoredProduct";
import getlambdaResponse from "../lib/lambdas";

const getProductsByCategory = async (category: string, session): Promise<StoredProduct[]> => {
  const response = (
    await getlambdaResponse(
      `product/search/category=${category}`,
      "GET",
      session ? session.accessToken : null
    )
  ).props.response.result.items;
  return response;
};

export const insertCart = async (id: string, session) => {
  if (session) {
    // authenticated

    const stringJSON = JSON.stringify({
      id,
      quantity: 1,
    });

    await getlambdaResponse(
      `cart/addProduct/${decode(session.accessToken).sub}`,
      "PUT",
      session ? session.accessToken : null,
      stringJSON
    );
  } else {
    // not authenticated -> add product to localstorage
    const cart = localStorage.getItem("cart"); // retrieve cart
    let jsonCart;

    if (cart != null) {
      jsonCart = JSON.parse(cart);
    } else {
      jsonCart = {
        items: [],
      };
    }

    let change: boolean = false;
    for (let i = 0; i < jsonCart.items.length; i += 1) {
      // look for the entry with a matching code value
      if (jsonCart.items[i].id === id) {
        jsonCart.items[i].quantity += 1;
        change = true;
      }
    }
    if (!change) {
      jsonCart.items.push({ id, quantity: 1 }); // push new id to the cart
    }
    localStorage.setItem("cart", JSON.stringify(jsonCart)); // update localstorage
  }
};

export const insertCartList = async (ids: string[], session) => {
  ids.forEach((id) => {
    insertCart(id, session);
  });
};

export const filterByPrice = async (category: string, session, min: number, max: number) => {
  let response = null;
  if (max === -1) {
    response = (
      await getlambdaResponse(
        `product/search/category=${category}&minprice=${min}`,
        "GET",
        session ? session.accessToken : null
      )
    ).props.response.result.items;
  } else {
    response = (
      await getlambdaResponse(
        `product/search/category=${category}&minprice=${min}&maxprice=${max}`,
        "GET",
        session ? session.accessToken : null
      )
    ).props.response.result.items;
  }

  return response;
};

export default getProductsByCategory;
