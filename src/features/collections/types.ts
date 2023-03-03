import { FieldType } from "features/fields";
import { FilterOperator } from "features/widget-table";

export type SchemaConfig = {
  filterable?: boolean;
  isDefaultFilter?: boolean;
  defaultOperator?: "==";
  availableOperators?: FilterOperator[];
  schema?: Record<string, SchemaProps>;
  hideTableColumn?: boolean;
  collectionId?: string;
  optionLabel?: string;
  options?: string[];
  required?: boolean;
  readonly?: boolean;
  helperText?: string;
};

export type SchemaProps = {
  label: string;
  type: keyof typeof FieldType;
  config?: SchemaConfig;
};

export type CollectionProps = {
  id: string;
  schema: Record<string, SchemaProps>;
};
