import React from "react";
import type { AppProps } from "next/app";
import type { NextPage } from "next";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { ThemeProvider } from "theme";
import { AuthenticationProvider } from "features/auth";
import { AuthorizationProvider } from "features/auth";
import { DataProvider } from "features/data";
import { firebaseDataProvider } from "features/firebase";
import { ToastProvider } from "features/toast";

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
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DataProvider provider={firebaseDataProvider()}>
        <ThemeProvider>
          <ToastProvider>
            <AuthenticationProvider>
              <AuthorizationProvider>{mainContent}</AuthorizationProvider>
            </AuthenticationProvider>
          </ToastProvider>
        </ThemeProvider>
      </DataProvider>
    </LocalizationProvider>
  );
}
