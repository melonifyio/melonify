import React from "react";
import { User } from "firebase/auth";
import auth from "../lib/auth";
import { doc, getDoc } from "firebase/firestore";
import firestore from "../lib/firestore";

export type UserProps = User & {
  role?: string;
};

export function useAuthUser(): [UserProps | null, boolean] {
  const [isLoading, setIsLoading] = React.useState(true);
  const [profile, setProfile] = React.useState<UserProps | null>(null);

  React.useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        await getDoc<any>(doc(firestore, `users/${user.email}`)).then(
          (firestoreUser) => {
            setProfile(firestoreUser.data());
          }
        );
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

  return [profile, isLoading];
}
