import { FieldProps } from "../../../components/form-field/types";

export type SmartTableProps = {
  collectionName: string;
  model: {
    fields: Record<string, FieldProps>;
  };
};
