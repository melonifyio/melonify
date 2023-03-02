import { useFirestoreDoc } from "features/firebase";
import { DocumentReference } from "firebase/firestore";

export function useDocument(keys: any, docRef: DocumentReference) {
  const res = useFirestoreDoc(keys, docRef);

  return res;
}
