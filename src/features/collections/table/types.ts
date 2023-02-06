import { FieldProps, ModelProps } from "features/forms/form-fields/types";

export type SmartTableProps = {
  title?: string;
  collectionName: string;
  model: ModelProps;
};
