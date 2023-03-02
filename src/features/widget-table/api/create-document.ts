import { collection } from "firebase/firestore";

import { useFirestoreAddDoc } from "features/firebase";

import firestore from "lib/firebase/firestore";

type UseCreateDocumentOptionProps = {
  onSuccess: () => void;
};

export function useCreateDocument(
  collectionId: string,
  options: UseCreateDocumentOptionProps
) {
  const { onSuccess } = options;

  const res = useFirestoreAddDoc(collection(firestore, collectionId), {
    onSuccess,
  });

  return res;
}
