import { useFirestoreSetDoc } from "features/firebase";
import { DocumentReference } from "firebase/firestore";

export function useUpdateDocument(docRef: DocumentReference) {
  const res = useFirestoreSetDoc(docRef);

  return res;
}
