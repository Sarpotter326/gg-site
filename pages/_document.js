import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* TEMP: Tailwind via CDN so styles work immediately */}
          <script src="https://cdn.tailwindcss.com"></script>
          {/* Disable automatic telephone detection on iOS (prevents blue phone-number links) */}
          <meta name="format-detection" content="telephone=no" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
