import * as React from "react";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import auth from "../lib/auth";

const provider = new GoogleAuthProvider();

export function useFirebaseSignInViaGoogle(options?: {
  onSuccess?: () => void;
}): [() => Promise<void>, boolean, Error | null] {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  const handleLogin = async () => {
    setIsLoading(true);

    signInWithPopup(auth, provider)
      .then((result) => {
        options && options.onSuccess && options.onSuccess();
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return [handleLogin, isLoading, error];
}
