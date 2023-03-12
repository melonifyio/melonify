import React from "react";

export type AuthContextProps = {
  useLoginViaGoogle: (options?: {
    onSuccess?: () => void;
  }) => [() => Promise<void>, boolean, Error | null];
  useLogout: () => [() => Promise<void>, boolean, Error | null];
  useCheckIfLoggedIn: () => [boolean, boolean, Error | null];
  usePermissions: () => {
    role: string;
  };
  useProfile: () => [any, boolean, Error | null];
  useSendLink: (options?: {
    onSuccess?: () => void;
  }) => [(props: { email: string }) => Promise<void>, boolean, Error | null];
};

export const AuthContext = React.createContext<AuthContextProps>({
  useLoginViaGoogle: () => [() => Promise.resolve(), false, null],
  useLogout: () => [() => Promise.resolve(), false, null],
  usePermissions: () => ({
    role: "MEMBER",
  }),
  useProfile: () => [null, false, null],
  useCheckIfLoggedIn: () => [false, false, null],
  useSendLink: () => [() => Promise.resolve(), false, null],
});

export type AuthProviderProps = {
  children: React.ReactNode;
  provider: AuthContextProps;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
  provider,
}) => {
  const contextValue = provider;

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuthProvider = () => React.useContext(AuthContext);
