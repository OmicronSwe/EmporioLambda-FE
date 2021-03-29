import { decode } from "jsonwebtoken";
import StoredProduct from "../../../src/objects/StoredProduct";
import getlambdaResponse from "../lib/lambdas";

export const getProduct = async (id: string, ses): Promise<StoredProduct> => {
  const response = (
    await getlambdaResponse(`product/${id}`, "GET", ses ? ses.accessToken : undefined)
  ).props.response.result;
  return response;
};

export const insertCart = async (session, product: StoredProduct, quantity: number) => {
  if (session) {
    // authenticated

    const stringJSON = JSON.stringify({
      id: product.id,
      quantity,
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
      if (jsonCart.items[i].id === product.id) {
        jsonCart.items[i].quantity += quantity;
        change = true;
      }
    }
    if (!change) {
      jsonCart.items.push({ id: product.id, quantity }); // push new id to the cart
    }
    localStorage.setItem("cart", JSON.stringify(jsonCart)); // update localstorage
  }
};
