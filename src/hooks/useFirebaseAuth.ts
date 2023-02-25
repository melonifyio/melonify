import * as React from "react";
import { User } from "firebase/auth";
import auth from "services/firebase/auth";

const useFirebaseAuth = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [profile, setProfile] = React.useState<User | null>(null);

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

  return {
    isLoading,
    isLoggedIn: !!profile,
    profile,
  };
};

export default useFirebaseAuth;
