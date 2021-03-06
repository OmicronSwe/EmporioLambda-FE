import { decode } from "jsonwebtoken";
import Order from "../types/Order";
import Profile from "../types/Profile";
import getlambdaResponse from "../../pages/api/lib/lambdas";
import ProductInCart from "../types/ProductInCart";
import StoredProduct from "../types/StoredProduct";

export const getOrderDetails = async (id: string, ses): Promise<Order> => {
  const response = await (await getlambdaResponse(`order/${id}`, "GET", ses.accessToken)).props
    .response.result;

  const productArray: ProductInCart[] = [];
  response.products.forEach((product) => {
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

  response.products = JSON.parse(JSON.stringify(productArray));

  return response;
};

export const getOrderDetailsByUser = async (id: string, ses): Promise<Order> => {
  const res = await (
    await getlambdaResponse(
      `order/getByUsername/${decode(ses.accessToken).sub}/${id}`,
      "GET",
      ses.accessToken
    )
  ).props.response.result;

  if (res === undefined) return null;

  const response = res.items[0];

  const productArray: ProductInCart[] = [];
  response.products.forEach((product) => {
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

  response.products = JSON.parse(JSON.stringify(productArray));

  return response;
};

export const getOrders = async (ses): Promise<Order[]> => {
  const response = await (await getlambdaResponse("order", "GET", ses.accessToken)).props.response;
  if (response.error) return null;
  return response.result.items;
};

export const getOrdersProfile = async (ses, profile: Profile): Promise<Order[]> => {
  const response = await (
    await getlambdaResponse(`order/getByUsername/${profile.username}`, "GET", ses.accessToken)
  ).props.response;
  if (response.error) return null;

  return response.result.items;
};
