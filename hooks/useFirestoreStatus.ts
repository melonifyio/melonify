import * as React from "react";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useApp } from "./useApp";
import { FirebaseError } from "firebase/app";

export const useFirestoreStatus = () => {
  const [connected, setConnected] = React.useState(false);
  const [error, setError] = React.useState<FirebaseError | undefined>();
  const [isLoading, setLoading] = React.useState(false);
  const { firebase } = useApp();

  const firestore = getFirestore(firebase);

  const docRef = doc(firestore, "example", "sample_doc");

  React.useEffect(() => {
    const checkStatus = async () => {
      setLoading(true);

      try {
        await getDoc(docRef);

        setConnected(true);
        setError(undefined);
      } catch (err: any) {
        setConnected(false);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (!firebase) {
      setConnected(false);
    } else {
      checkStatus();
    }
  }, []);

  return { connected, error, isLoading };
};
