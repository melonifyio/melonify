import React from "react";
import { User } from "firebase/auth";
import auth from "services/firebase/auth";

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
  const [isLoading, setIsLoading] = React.useState(true);
  const [profile, setProfile] = React.useState<UserProps | null>(null);

  React.useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setProfile(user);
      } else {
        setProfile(null);
      }

      setIsLoading(false);
    });

    // Unsubscribe to the listener when unmounting
    return () => {
      unsubscribe();
    };
  }, []);

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

export const useAuthentication = () => React.useContext(AuthenticationContext);
