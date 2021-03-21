import { Product } from "../../../src/objects/Product";
import getlambdaResponse from "../lib/lambdas";

export const getProduct = async (id:string): Promise<Product> => {
  const response = (await getlambdaResponse(`product/${id}`, "GET")).props.response.result;
  return response;
};

export const insertCart = async (session, id:string, quantity:number) => {
  console.log(id);
  
    // not authenticated -> add product to localstorage
    const cart = localStorage.getItem("cart"); // retrieve cart
    let jsonCart;



    if (cart != null) {
      jsonCart = JSON.parse(cart);
    } else {
      jsonCart = {
        items:[]
      };
    }

    let change:boolean = false;
    for (var i = 0; i < jsonCart.items.length; i++){
      // look for the entry with a matching code value
      if (jsonCart.items[i].id == id){
        jsonCart.items[i].quantity += quantity;
        change = true;
      }
    }

    if(!change) {
      jsonCart.items.push({ id: id, quantity:quantity }); // push new id to the cart
    }

    localStorage.setItem("cart", JSON.stringify(jsonCart)); // update localstorage
  
};
