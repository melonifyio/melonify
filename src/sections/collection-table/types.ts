import { FieldProps } from "components/form-field/types";

export type SmartTableProps = {
  title?: string;
  collectionName: string;
  model: {
    fields: Record<string, FieldProps>;
  };
};
