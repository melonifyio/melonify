import React from "react";
import type { AppProps } from "next/app";
import type { NextPage } from "next";

import { ThemeProvider } from "theme";
import { AuthenticationProvider } from "features/auth";
import { AuthorizationProvider } from "features/auth";
import { DataProvider } from "features/data";
import { firebaseDataProvider } from "features/firebase";

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
    <DataProvider provider={firebaseDataProvider()}>
      <ThemeProvider>
        <AuthenticationProvider>
          <AuthorizationProvider>{mainContent}</AuthorizationProvider>
        </AuthenticationProvider>
      </ThemeProvider>
    </DataProvider>
  );
}
