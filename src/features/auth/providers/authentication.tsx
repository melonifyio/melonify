import React from "react";
import { User } from "firebase/auth";
import { useAuthUser } from "../api/get-user";

export type UserProps = User & {
  role?: string;
};

export type IAuthenticationContext = {
  profile: UserProps | null;
  isLoading: boolean;
  authenticated: boolean;
};

export const AuthenticationContext =
  React.createContext<IAuthenticationContext>({
    profile: null,
    isLoading: false,
    authenticated: false,
  });

export type AuthenticationProviderProps = {
  children: React.ReactNode;
};

export const AuthenticationProvider: React.FC<AuthenticationProviderProps> = ({
  children,
}) => {
  const [profile, isLoading] = useAuthUser();

  const contextValue = React.useMemo(
    () => ({
      authenticated: Boolean(profile),
      profile,
      isLoading,
    }),
    [profile, isLoading]
  );

  return (
    <AuthenticationContext.Provider value={contextValue}>
      {children}
    </AuthenticationContext.Provider>
  );
};
