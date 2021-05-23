import ProductSend from "../types/ProductSend";
import StoredProduct from "../types/StoredProduct";
import getlambdaResponse from "../../pages/api/lib/lambdas";

export const insertProduct = async (product: ProductSend, ses): Promise<boolean> => {
  const { response } = (
    await getlambdaResponse("product", "POST", ses.accessToken, JSON.stringify(product))
  ).props;
  if (response.err !== undefined) {
    return false;
  }
  return true;
};

export const removeProduct = async (id: string, ses): Promise<boolean> => {
  const { response } = (await getlambdaResponse(`product/${id}`, "DELETE", ses.accessToken)).props;
  if (response.err !== undefined) return false;
  return true;
};

export const getProducts = async (ses): Promise<StoredProduct[]> => {
  const { response } = (
    await getlambdaResponse("product", "GET", ses ? ses.accessToken : null)
  ).props;

  if (response.error || !response.result.items) return [];
  return response.result.items;
};

export const updateProduct = async (
  id: string,
  session,
  modifiedProduct: ProductSend
): Promise<boolean> => {
  const { response } = (
    await getlambdaResponse(
      `product/${id}`,
      "PUT",
      session.accessToken,
      JSON.stringify(modifiedProduct)
    )
  ).props;
  if (response.error !== undefined) return false;
  return true;
};

export const getProduct = async (id: string, ses): Promise<StoredProduct> => {
  const response = (await getlambdaResponse(`product/${id}`, "GET", ses.accessToken)).props.response
    .result;
  return response;
};

export const insertCategory = async (category: string, ses): Promise<boolean> => {
  const body = {
    name: category,
  };
  const { response } = (
    await getlambdaResponse("category", "POST", ses.accessToken, JSON.stringify(body))
  ).props;
  if (response.error) return false;
  return true;
};

export const removeCategory = async (name: string, ses): Promise<boolean> => {
  const { response } = (
    await getlambdaResponse(`category/${name}`, "DELETE", ses.accessToken)
  ).props;
  if (response.error) return false;
  return true;
};

export const getCategories = async (ses): Promise<string[]> => {
  const { response } = (
    await getlambdaResponse("category", "GET", ses ? ses.accessToken : null)
  ).props;

  if (response.error || !response.result.items) return [];
  return response.result.items;
};

export const setTax = async (taxValue: number, session): Promise<boolean> => {
  const body = {
    rate: taxValue,
  };
  try {
    const { response } = (
      await getlambdaResponse(
        `tax/IVA`,
        "POST",
        session ? session.accessToken : null,
        JSON.stringify(body)
      )
    ).props;
    if (response.error || !response.message) return false;
    return true;
  } catch (e) {
    return false;
  }
};

export const fileToBase64 = async (file): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = () => resolve(btoa(reader.result.toString()));
    reader.onerror = (e) => reject(e);
  });
};
