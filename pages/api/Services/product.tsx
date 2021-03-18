import getlambdaResponse from "../lib/lambdas";

const getProduct = async (id: string) => {
  const { response } = (await getlambdaResponse(`product/${id}`, "GET")).props;
  return response;
};

export default getProduct;
