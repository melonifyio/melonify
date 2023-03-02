import { useFirestoreDelete, useFirestoreDoc } from "features/firebase";
import { DocumentReference } from "firebase/firestore";

export function useDeleteDocument(docRef: DocumentReference, options: any) {
  const res = useFirestoreDelete(docRef, options);

  return res;
}
