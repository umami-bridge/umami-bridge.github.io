import "../styles/globals.css";
import "../styles/reset.css";
import type { AppProps } from "next/app";
import { DAppProvider, Mainnet } from "@usedapp/core";

function MyApp({ Component, pageProps }: AppProps) {

  return (
      <Component {...pageProps} />
  );
}

export default MyApp;
