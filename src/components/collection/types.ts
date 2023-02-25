import { FieldType } from "components/field/field/field";

export type SchemaProps = {
  label: string;
  type: keyof typeof FieldType;
};

export type CollectionProps = {
  id: string;
  schema: Record<string, SchemaProps>;
};
