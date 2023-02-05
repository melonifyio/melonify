import { collection } from "firebase/firestore";
import { useFirestoreCollectionMutation } from "@react-query-firebase/firestore";
import firestore from "config/firestore";

type UseCreateCollectionProps = {
  collectionName: string;
};

const useCreateCollection = ({ collectionName }: UseCreateCollectionProps) => {
  const ref = collection(firestore, collectionName);
  const mutation = useFirestoreCollectionMutation(ref);

  return mutation;
};

export default useCreateCollection;
