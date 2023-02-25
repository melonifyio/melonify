import * as React from "react";
import { addDoc } from "firebase/firestore";

type UseFirestoreAddDocOptionsProps = {
  onSuccess?: () => void;
};

const useFirestoreAddDoc = (
  collectionRef: any,
  options?: UseFirestoreAddDocOptionsProps
) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<Error | null>(null);

  const mutate = async (data: any) => {
    setIsLoading(true);

    await addDoc(collectionRef, data)
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

export default useFirestoreAddDoc;
