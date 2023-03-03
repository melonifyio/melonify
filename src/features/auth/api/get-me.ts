import { useFirestoreDoc } from "features/firebase";
import { doc } from "firebase/firestore";
import firestore from "lib/firebase/firestore";
import { useAuthentication } from "../hooks/use-authentication";
import { UserProps } from "./get-user";

export function useMe() {
  const { profile } = useAuthentication();

  const res = useFirestoreDoc<UserProps>(
    ["me", profile?.email],
    doc(firestore, `users/${profile?.email || "unknown"}`)
  );

  return res;
}
