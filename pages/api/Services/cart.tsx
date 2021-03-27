import ProductInCart from "../../../src/objects/ProductInCart";
import getlambdaResponse from "../lib/lambdas";
import {decode} from 'jsonwebtoken'

export const getProductsInCart = async (params): Promise<ProductInCart[]> => {
    const { response } = (await getlambdaResponse("cart/"+decode(params.accessToken).sub,"GET",params.accessToken)).props;
    console.log(response.error);
    return response;
}

export const removeProductFromCart = async (params): Promise<boolean> => {
    const { response } = (await getlambdaResponse("cart/removeProduct/"+params, "PUT", params.accessToken, params.body)).props;
    if(response.err) return false;
    return true;
}

export const removeAllProductsFromCart = async (params): Promise<boolean> => {
    const { response } = (await getlambdaResponse("cart/toEmpty/"+decode(params.accessToken).sub, "PUT", params.accessToken)).props;
    if(response.err) return false;
    return true;
}

export const insertProductInCart = async (params): Promise<boolean> => {
    const { response } = (await getlambdaResponse("cart/addProduct/"+decode(params.auth.accessToken).sub, "PUT", params.auth.accessToken, params.body)).props;
    if(response.err) return false;
    return true;
}

export const getProduct = async (params) => {
    const { response } = (await getlambdaResponse("product/"+params, "GET", params.accessToken)).props.response.result;
    return response;
}