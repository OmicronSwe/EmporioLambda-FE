export default class Fetcher {
  url: URL;

  constructor(funName: string) {
    this.url = new URL( // creates the URL based on enviroment variables and the function name
      `https://${process.env.NEXT_PUBLIC_API_ID}.execute-api.${process.env.NEXT_PUBLIC_REGION_API}.amazonaws.com/${process.env.NEXT_PUBLIC_STAGE}/${funName}`
    );
  }

  async getJSONResponse(method: string, params: string): Promise<any> {
    let req = null;
    if (method === "GET") {
      req = await fetch(this.url.href);
    } else {
      req = await fetch(this.url.href, {
        body: params,
        headers: {
          "Content-Type": "application/json",
        },
        method,
      });
    }

    const data = await req.json();

    return data;
  }
}
