import * as React from "react";
import { setDoc } from "firebase/firestore";

type UseFirestoreSetDocOptionsProps = {
  onSuccess?: () => void;
};

const useFirestoreSetDoc = (
  docRef: any,
  options?: UseFirestoreSetDocOptionsProps
) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<Error | null>(null);

  const mutate = async (data: any) => {
    setIsLoading(true);

    await setDoc(docRef, data)
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

export default useFirestoreSetDoc;
