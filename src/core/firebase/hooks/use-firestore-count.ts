import * as React from "react";
import { getCountFromServer } from "firebase/firestore";

export const useFirestoreCount = <T>(
  keys: any,
  collectionRef: any
): [T, boolean, Error | null] => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const getCount = async () => {
      setIsLoading(true);
      await getCountFromServer(collectionRef)
        .then((res) => {
          setCount(res.data().count);
        })
        .catch((err) => {
          setError(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    getCount();
  }, [JSON.stringify(keys)]);

  return [count as T, isLoading, error];
};
