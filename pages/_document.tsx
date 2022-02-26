import { Head, Main, NextScript, Html } from "next/document";
import { ReactElement } from "react";

export default function Document(): ReactElement {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/favicon-32x32.png"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
        />
      </Head>
      <body>
        <Main />
        <div>
          <NextScript />
        </div>
      </body>
    </Html>
  );
}
