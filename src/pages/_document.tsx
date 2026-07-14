import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" className="bg-ink">
      <Head>
        {/* "signature" mark — Fraunces italic e + terminal cursor
            (regenerate with scripts/make-favicon.mjs) */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32.png"
        />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta property="og:title" content="edmundlzen.dev" />
        <meta property="og:description" content="Edmund's personal website" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://edmundlzen.dev" />
        <meta
          property="og:image"
          content="https://edmundlzen.dev/api/dyn_images/home"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:image"
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
