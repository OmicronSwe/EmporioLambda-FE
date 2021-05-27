import Fetcher from "./fetcher";

export default async function getlambdaResponse(
  funName: string,
  method: string,
  session: string,
  params: string = null
) {
  const fetcher = new Fetcher(funName);
  return {
    props: {
      response: await fetcher.getJSONResponse(method, params, session),
    },
  };
}
