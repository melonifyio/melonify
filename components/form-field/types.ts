export enum FieldType {
  TEXT = "TEXT",
  NUMBER = "NUMBER",
  IMAGE = "IMAGE",
  ENUM = "ENUM",
  MAP = "MAP",
}

export type FieldProps = {
  fieldKey: string;
  name: string;
  type: keyof typeof FieldType;
  config?: {
    model?: {
      fields: Record<string, FieldProps>;
    };
    options?: string[];
    required?: boolean | string;
  };
  index?: number;
};

export type ModelProps = {
  fields: Record<string, FieldProps>;
};
