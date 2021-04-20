/* eslint-disable import/no-extraneous-dependencies */
import "tailwindcss/tailwind.css";
import Head from "next/head";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,user-scalable=no,user-scalable=0"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
