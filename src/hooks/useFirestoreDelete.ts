import * as React from "react";
import { DocumentReference, deleteDoc } from "firebase/firestore";

type UseFirestoreDeleteOptionprops = {
  onSuccess?: () => void;
};

const useFirestoreDelete = (
  docRef: DocumentReference,
  options?: UseFirestoreDeleteOptionprops
): [() => Promise<any>, boolean, Error | null] => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  const mutate = async () => {
    setIsLoading(true);

    await deleteDoc(docRef)
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

export default useFirestoreDelete;
