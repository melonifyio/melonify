import { Firestore, QueryConstraint } from "firebase/firestore";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "react-query";
import { ModelProps } from "../../components/form-field/types";

export type CollectionListProps = {
  firestore: Firestore;
  collectionName: string;
  model: ModelProps;
  title?: string;
  onClickItem?: (item: any) => void;
  constraints?: QueryConstraint[];
};

export type CollectionListItemProps<T> = CollectionListProps & {
  item: T & {
    _id: string;
  };
  refetch: (
    options?: RefetchOptions & RefetchQueryFilters<any>
  ) => Promise<any>;
};
