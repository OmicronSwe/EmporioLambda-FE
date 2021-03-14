import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { AppProps } from "next/app";
import { Provider } from "next-auth/client";

export default function EmporioLambdaFE({ Component, pageProps }: AppProps) {
  const { session } = pageProps;
  return (
    <Provider options={{ baseUrl: process.env.NEXT_PUBLIC_SITE }} session={session}>
      <Component {...pageProps} />
    </Provider>
  );
}
