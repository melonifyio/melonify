import React from "react";
import type { AppProps } from "next/app";
import type { NextPage } from "next";
import { QueryClient, QueryClientProvider } from "react-query";

import { ThemeProvider } from "theme";
import { AuthenticationProvider } from "features/auth";
import { AuthorizationProvider } from "features/auth";
import { DataProvider } from "features/data-provider";
import { firebaseDataProvider } from "features/firebase";

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
      <ThemeProvider>
        <AuthenticationProvider>
          <DataProvider provider={firebaseDataProvider()}>
            <AuthorizationProvider>{mainContent}</AuthorizationProvider>
          </DataProvider>
        </AuthenticationProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
