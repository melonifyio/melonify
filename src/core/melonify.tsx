import React from "react";

import { LocalizationProvider } from "core/localization";
import { ThemeProvider } from "core/theme";
import { AuthContextProps, AuthProvider } from "core/auth";
import { DataContextProps, DataProvider } from "core/data";
import { ToastProvider } from "core/toast";

import {
  firebaseAuthProvider,
  firebaseDataProvider,
} from "core/firebase";
import { MenuProvider, MenuProviderProps } from "./menu";

type MelonifyProviderProps = {
  children: React.ReactNode;
  menu?: MenuProviderProps["data"];
  dataProvider?: DataContextProps;
  authProvider?: AuthContextProps;
};

export default function Melonify(props: MelonifyProviderProps) {
  const { children, dataProvider, authProvider, menu } = props;

  return (
    <LocalizationProvider>
      <DataProvider provider={dataProvider || firebaseDataProvider()}>
        <ThemeProvider>
          <ToastProvider>
            <AuthProvider provider={authProvider || firebaseAuthProvider()}>
              <MenuProvider data={menu}>{children}</MenuProvider>
            </AuthProvider>
          </ToastProvider>
        </ThemeProvider>
      </DataProvider>
    </LocalizationProvider>
  );
}
