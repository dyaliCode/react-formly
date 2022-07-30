import type { AppProps } from "next/app";
// import '../styles/globals.css'
import "@picocss/pico/css/pico.css";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
