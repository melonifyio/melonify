import { FieldProps, ModelProps } from "components/form-fields/types";

export type SmartTableProps = {
  title?: string;
  collectionName: string;
  model: ModelProps;
};
