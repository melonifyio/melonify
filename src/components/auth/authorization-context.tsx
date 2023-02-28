import { CircularProgress, Stack } from "@mui/material";
import { doc } from "firebase/firestore";
import useFirestoreDoc from "hooks/useFirestoreDoc";
import React from "react";
import firestore from "services/firebase/firestore";
import { useAuthentication } from "./authentication-context";

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
  const { profile } = useAuthentication();

  const [data, isLoading, error] = useFirestoreDoc(
    ["me", profile?.email],
    doc(firestore, `users/${profile?.email || "unknown"}`)
  );

  const contextValue = React.useMemo(
    () => ({
      role: data?.role || "",
      isLoading,
      error: error || undefined,
    }),
    [data, error, isLoading]
  );

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

  return (
    <AuthorizationContext.Provider value={contextValue}>
      {children}
    </AuthorizationContext.Provider>
  );
};

export const useAuthorization = () => React.useContext(AuthorizationContext);
