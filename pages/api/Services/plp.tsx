import getlambdaResponse from "../lib/lambdas";

export const getProductsByCategory = async (category: string) => {
    const { response } = (await getlambdaResponse("product/search/category="+category, "GET")).props;
    return response;
  };