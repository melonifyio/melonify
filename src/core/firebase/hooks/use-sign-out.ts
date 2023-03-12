import * as React from "react";
import { signOut } from "firebase/auth";
import auth from "../lib/auth";

export const useFirebaseSignOut = (): [
  () => Promise<void>,
  boolean,
  Error | null
] => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  const mutate = async () => {
    setIsLoading(true);

    await signOut(auth)
      .then(() => {})
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return [mutate, isLoading, error];
};
