import { Firestore } from "firebase/firestore";
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
};

export type CollectionListItemProps<T> = CollectionListProps & {
  item: T & {
    id: string;
  };
  refetch: (
    options?: RefetchOptions & RefetchQueryFilters<any>
  ) => Promise<any>;
};
