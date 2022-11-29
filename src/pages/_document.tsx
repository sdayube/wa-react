import { Head, Html, Main, NextScript } from 'next/document';
import { getCssText } from '../styles';

// The Document component is used to render the HTML document and its head
// configurations, and will be applied for all pages in the Next.js application.

export default function Document() {
  return (
    <Html>
      <Head>
        <meta charSet="utf-8" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700|Roboto:300,400,500,700&display=swap"
          rel="stylesheet"
        />

        {/* This configuration is used to allow stitches to work with SSR */}
        <style
          id="stitches"
          dangerouslySetInnerHTML={{ __html: getCssText() }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
