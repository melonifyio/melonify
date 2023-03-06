import firestore from "lib/firebase/firestore";
import { useFirestoreDoc } from "features/firebase";
import { doc } from "firebase/firestore";
import { useAuthentication } from "../hooks/use-authentication";
import { UserModel } from "schema";

export function useMe() {
  const { profile } = useAuthentication();

  const res = useFirestoreDoc<UserModel>(
    ["me", profile?.email],
    doc(firestore, `users/${profile?.email || "unknown"}`)
  );

  return res;
}
