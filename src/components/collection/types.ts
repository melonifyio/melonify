import { FieldType } from "components/field/field/field";
import { FilterOperator } from "components/table/table-filter/table-filter-item";

type SchemaConfig = {
  filterable?: boolean;
  isDefaultFilter?: boolean;
  defaultOperator?: "==";
  availableOperators?: FilterOperator[];
  schema?: Record<string, SchemaProps>;
  hideTableColumn?: boolean;
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
