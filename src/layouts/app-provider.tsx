import * as React from "react";

type AppProviderProps = {
  children: React.ReactNode;
};

export default function AppProvider(props: AppProviderProps) {
  const { children } = props;

  return <>{children}</>;
}
