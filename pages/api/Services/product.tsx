import getlambdaResponse from "../lib/lambdas";

export const getProduct = async (id: string) => {
  const { response } = (await getlambdaResponse(`product/${id}`, "GET")).props;
  return response;
};

export const insertCart = async (session, id) => {
  if (session) {
    // authenticated -> add product to remote cart (dynamoDB) through API
  } else {
    // not authenticated -> add product to localstorage
    const cart = localStorage.getItem("cart"); // retrieve cart
    let jsonCart;

    if (cart != null) {
      jsonCart = JSON.parse(cart);
    } else {
      jsonCart = {
        ids: [],
      };
    }

    jsonCart.ids.push({ product_id: id }); // push new id to the cart
    localStorage.setItem("cart", JSON.stringify(jsonCart)); // update localstorage
  }
};
