import { decode } from 'jsonwebtoken';
import { Product } from "../../../src/objects/Product";
import getlambdaResponse from "../lib/lambdas";

export const getProduct = async (id: string, ses): Promise<Product> => {
  const response = (
    await getlambdaResponse(`product/${id}`, "GET", ses ? ses.accessToken : undefined)
  ).props.response.result;
  return response;
};

export const insertCart = async (session, product: Product, quantity: number) => {
 
  if (session) {
    // authenticated
    decode(session.accessToken).sub;
    console.log(session);
    console.log(decode(session.accessToken).sub);
    const stringJSON = JSON.stringify({
      id: product.id,
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image,
      quantity: quantity
    });
    
    //const response  = (await getlambdaResponse(`cart/addProduct/${session.user.email}`, "PUT", session, stringJSON));
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
      if (jsonCart.items[i].id == product.id) {
        jsonCart.items[i].quantity += quantity;
        change = true;
      }
    }
    console.log(change);
    if (!change) {
      jsonCart.items.push({ id: product.id, quantity }); // push new id to the cart
    }
    console.log(jsonCart);
    localStorage.setItem("cart", JSON.stringify(jsonCart)); // update localstorage
  }
};
