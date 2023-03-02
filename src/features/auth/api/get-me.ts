import { useFirestoreDoc } from "features/firebase";
import { doc } from "firebase/firestore";
import firestore from "lib/firebase/firestore";
import { useAuthentication } from "../hooks/use-authentication";

export function useMe() {
  const { profile } = useAuthentication();

  const res = useFirestoreDoc(
    ["me", profile?.email],
    doc(firestore, `users/${profile?.email || "unknown"}`)
  );

  return res;
}
