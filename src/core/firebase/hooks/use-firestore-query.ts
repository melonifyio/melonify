import * as React from "react";
import { Query, onSnapshot } from "firebase/firestore";

export const useFirestoreQuery = <T>(
  keys: any,
  query: Query
): [T[], boolean, Error | null, () => void, () => void] => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);
  const [docs, setDocs] = React.useState<T[]>([]);
  const [lastVisible, setLastVisible] = React.useState<any>();
  const [firstVisible, setFirstVisible] = React.useState<any>();

  React.useEffect(() => {
    setIsLoading(true);

    const unsubscribe = onSnapshot(
      query,
      (querySnapshot) => {
        setIsLoading(false);

        setDocs(
          querySnapshot.docs.map((doc) => ({
            _id: doc.id,
            ...(doc.data() as T),
          }))
        );

        setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
        setFirstVisible(querySnapshot.docs[0]);
      },
      (err) => {
        console.log(err);
        setError(err);
      }
    );
    return () => unsubscribe();
  }, [JSON.stringify(keys)]);

  return [docs, isLoading, error, firstVisible, lastVisible];
};
