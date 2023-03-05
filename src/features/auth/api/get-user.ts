import React from "react";
import { signOut, User } from "firebase/auth";
import auth from "lib/firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import firestore from "lib/firebase/firestore";

export type UserProps = User & {
  role?: string;
};

export function useAuthUser(): [UserProps | null, boolean] {
  const [isLoading, setIsLoading] = React.useState(true);
  const [profile, setProfile] = React.useState<UserProps | null>(null);

  React.useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      const docRef = doc(firestore, `users/${user?.email}`);

      const isValid = async () => getDoc(docRef);

      if (user) {
        // isValid()
        //   .then((res) => {
        //     if (res.data()) {
        //       setProfile(user);
        //     } else {
        //       signOut(auth);
        //     }
        //   })
        //   .catch(() => {
        //     signOut(auth);
        //   });

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

  return [profile, isLoading];
}
