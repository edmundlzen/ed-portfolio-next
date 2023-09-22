import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cabin:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap"
          rel="stylesheet"
        />
        <link
          type="image/png"
          sizes="96x96"
          rel="icon"
          href="icons8-pokeball-96.png"
        />
        <meta property="og:title" content="edmundlzen.dev" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://edmundlzen.dev" />
        <meta
          property="og:image"
          content="https://edmundlzen.dev/api/dyn_images/home"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
