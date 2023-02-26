import * as React from "react";
import {
  collection,
  limit,
  orderBy,
  query,
  startAfter,
  QueryConstraint,
  endBefore,
  where,
} from "firebase/firestore";
import useFirestoreCount from "hooks/useFirestoreCount";
import useFirestoreQuery from "hooks/useFirestoreQuery";
import firestore from "services/firebase/firestore";
import { FilterItem } from "./table-filter/table-filter-item";

type UseTableProps = {
  collectionId: string;
  rowsPerPage: number;
  filters: Record<string, FilterItem>;
};

export default function useTable({
  collectionId,
  rowsPerPage,
  filters,
}: UseTableProps) {
  const initialConstraints = [orderBy("createdAt"), limit(rowsPerPage)];
  const collectionRef = collection(firestore, collectionId);
  const [queryConstraints, setQueryConstraints] =
    React.useState<QueryConstraint[]>(initialConstraints);

  const [data, isLoading, error, firstVisible, lastVisible] = useFirestoreQuery(
    [collectionId, queryConstraints],
    query(collectionRef, ...queryConstraints)
  );

  const [count] = useFirestoreCount(
    [collectionRef, queryConstraints],
    query(collectionRef, ...queryConstraints)
  );

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

  React.useEffect(() => {
    const newConstraints: QueryConstraint[] = [];

    Object.keys(filters).map((key) => {
      newConstraints.push(
        where(filters[key].field, filters[key].operator, filters[key].value)
      );
    });

    setQueryConstraints([...initialConstraints, ...newConstraints]);
  }, [filters]);

  return {
    data,
    isLoading,
    error,
    count,
    showPreviousPage: () => handlePrev(firstVisible),
    showNextPage: () => handleNext(lastVisible),
  };
}
