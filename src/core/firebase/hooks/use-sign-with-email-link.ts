import React from "react";
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import auth from "../lib/auth";

type UseSignInByLink = {
  email: string;
  onSuccess: () => void;
  onError?: () => void;
};

export function useSignInWithEmailLink({
  email,
  onSuccess,
  onError,
}: UseSignInByLink): [boolean, boolean, Error | null] {
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    setIsLoading(true);

    if (isSignInWithEmailLink(auth, window.location.href)) {
      signInWithEmailLink(auth, email, window.location.href)
        .then(() => {
          onSuccess();
        })
        .catch((error) => {
          onError && onError();
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  return [true, isLoading, null];
}
