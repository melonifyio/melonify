import { CircularProgress, Stack } from "@mui/material";
import { signOut } from "firebase/auth";
import { AccountPopover } from "layouts/account-popover";
import auth from "lib/firebase/auth";
import { useRouter } from "next/router";
import React from "react";
import { useMe } from "../api/get-me";

export type IAuthorizationContext = {
  isLoading: boolean;
  role: string;
  error?: Error;
};

export const AuthorizationContext = React.createContext<IAuthorizationContext>({
  isLoading: false,
  role: "",
});

export type AuthorizationProviderProps = {
  children: React.ReactNode;
};

export const AuthorizationProvider: React.FC<AuthorizationProviderProps> = ({
  children,
}) => {
  const [data, isLoading, error] = useMe();

  const router = useRouter();

  if (isLoading) {
    return (
      <Stack
        direction="row"
        height="100vh"
        alignItems="center"
        justifyContent="center"
      >
        <CircularProgress size={24} />
      </Stack>
    );
  }

  const contextValue = {
    role: data?.role || "",
    isLoading,
    error: error || undefined,
  };

  return (
    <AuthorizationContext.Provider value={contextValue}>
      {children}
    </AuthorizationContext.Provider>
  );
};
