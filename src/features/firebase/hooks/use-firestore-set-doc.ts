import * as React from "react";
import { setDoc } from "firebase/firestore";

type UseFirestoreSetDocOptionsProps = {
  onSuccess?: () => void;
  merge: boolean;
};

export const useFirestoreSetDoc = (
  docRef: any,
  options?: UseFirestoreSetDocOptionsProps
): [(values: any) => Promise<any>, boolean, Error | null] => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<Error | null>(null);

  const mutate = async (data: any) => {
    setIsLoading(true);

    await setDoc(docRef, data, {
      merge: options?.merge || true,
    })
      .then(() => {
        options?.onSuccess && options.onSuccess();
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return [mutate, isLoading, error];
};
