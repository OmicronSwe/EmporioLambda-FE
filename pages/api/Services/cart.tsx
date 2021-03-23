import ProductInCart from "../../../src/objects/ProductInCart";
import getlambdaResponse from "../lib/lambdas";

export const getProductsInCart = async (params : string): Promise<ProductInCart[]> => {
    const { response } = (await getlambdaResponse("cart/"+params,"GET")).props.response.result;
    return response;
}

export const removeProductFromCart = async (email : string, params): Promise<boolean> => {
    const { response } = (await getlambdaResponse("cart/removeProduct/"+email, "PUT", params)).props;
    if(response.err) return false;
    return true;
}

export const removeAllProductsFromCart = async (params): Promise<boolean> => {
    const { response } = (await getlambdaResponse("cart/toEmpty/"+params, "PUT")).props;
    if(response.err) return false;
    return true;
}

export const insertProductInCart = async (email : string, params): Promise<boolean> => {
    const { response } = (await getlambdaResponse("cart/addProduct/"+email, "PUT", params)).props;
    if(response.err) return false;
    return true;
}

export const getProduct = async (params : string) => {
    const { response } = (await getlambdaResponse("product/"+params, "GET")).props.response.result;
    return response;
}