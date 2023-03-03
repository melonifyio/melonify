import { useFirestoreCount } from "features/firebase";
import { collection } from "firebase/firestore";

import firestore from "lib/firebase/firestore";

export function useCount(collectionId: string) {
  const res = useFirestoreCount(
    collectionId,
    collection(firestore, collectionId)
  );

  return res;
}
