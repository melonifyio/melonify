import { doc } from "firebase/firestore";
import firestore from "lib/firebase/firestore";

export function useDocumentRef(path: string) {
  return doc(firestore, path);
}
