import { FieldProps, ModelProps } from "components/forms/form-fields/types";

export type SmartTableProps = {
  title?: string;
  collectionName: string;
  model: ModelProps;
};
