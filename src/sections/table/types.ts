import { FieldProps } from "components/form-fields/types";

export type SmartTableProps = {
  title?: string;
  collectionName: string;
  model: {
    fields: Record<string, FieldProps>;
  };
};
