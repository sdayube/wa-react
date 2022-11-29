import type { AppProps } from 'next/app';
import { globalStyles } from '../styles/global';

// This component acts as a wrapper for all pages in the Next.js application.

export default function App({ Component, pageProps }: AppProps) {
  // This calls the globalStyles function to apply global styles to the application.
  globalStyles();

  return <Component {...pageProps} />;
}
