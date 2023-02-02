import * as React from "react";

type AppContextProps = {};

export const AppContext = React.createContext<AppContextProps>({});

type AppProviderProps = {
  children: React.ReactNode;
};

export default function AppProvider(props: AppProviderProps) {
  const { children } = props;

  return <>{children}</>;
}
