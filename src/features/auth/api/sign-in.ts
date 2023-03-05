import React from "react";
import {
  isSignInWithEmailLink,
  sendSignInLinkToEmail,
  signInWithEmailLink,
} from "firebase/auth";
import auth from "lib/firebase/auth";

type UseSignInByLink = {
  onSuccess: () => void;
};

export function useSignInByLink({
  onSuccess,
}: UseSignInByLink): [({ email }: { email: string }) => void, boolean] {
  const [isLoading, setIsLoading] = React.useState(false);

  const signInByLink = async ({ email }: { email: string }) => {
    setIsLoading(true);

    if (isSignInWithEmailLink(auth, window.location.href)) {
      signInWithEmailLink(auth, email, window.location.href)
        .then(() => {
          onSuccess();
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  };

  return [signInByLink, isLoading];
}
