import * as React from "react";
import {
  collection,
  limit,
  orderBy,
  query,
  startAfter,
  QueryConstraint,
  endBefore,
} from "firebase/firestore";
import useFirestoreCount from "hooks/useFirestoreCount";
import useFirestoreQuery from "hooks/useFirestoreQuery";
import firestore from "services/firebase/firestore";

type UseTableProps = {
  collectionId: string;
  rowsPerPage: number;
};

export default function useTable({ collectionId, rowsPerPage }: UseTableProps) {
  const initialConstraints = [orderBy("createdAt"), limit(rowsPerPage)];
  const collectionRef = collection(firestore, collectionId);
  const [queryConstraints, setQueryConstraints] =
    React.useState<QueryConstraint[]>(initialConstraints);

  const [data, isLoading, error, firstVisible, lastVisible] = useFirestoreQuery(
    [collectionId, queryConstraints],
    query(collectionRef, ...queryConstraints)
  );

  const [count] = useFirestoreCount(collectionRef);

  const handleNext = (lastVisible: any) => {
    setQueryConstraints(
      lastVisible
        ? [...initialConstraints, startAfter(lastVisible)]
        : initialConstraints
    );
  };

  const handlePrev = (lastVisible: any) => {
    setQueryConstraints(
      firstVisible
        ? [...initialConstraints, endBefore(firstVisible)]
        : initialConstraints
    );
  };

  return {
    data,
    isLoading,
    error,
    count,
    showPreviousPage: () => handlePrev(firstVisible),
    showNextPage: () => handleNext(lastVisible),
  };
}
