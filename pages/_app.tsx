import React from "react";
import type { AppProps } from "next/app";
import type { NextPage } from "next";
import Script from "next/script";
import { QueryClient, QueryClientProvider } from "react-query";

import { ThemeProvider } from "../theme";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  const mainContent = getLayout(<Component {...pageProps} />);

  return (
    <QueryClientProvider client={queryClient}>
      <Script src="/static/drift.js" />
      <ThemeProvider>{mainContent}</ThemeProvider>
    </QueryClientProvider>
  );
}
