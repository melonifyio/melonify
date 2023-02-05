export enum FieldType {
  TEXT = "TEXT",
  NUMBER = "NUMBER",
  IMAGE = "IMAGE",
  ENUM = "ENUM",
  MAP = "MAP",
  // DATE = "DATE",
  BOOLEAN = "BOOLEAN",
  REFERENCE = "REFERENCE",
  SUBCOLLECTION = "SUBCOLLECTION",
}

export type OptionsProps = Record<string, { fieldKey: string; name: string }>;

export type FieldProps = {
  fieldKey: string;
  name: string;
  helperText?: string;
  type: keyof typeof FieldType;
  config?: {
    model?: Record<string, FieldProps>;
    options?: OptionsProps;
    required?: boolean | string;
    collectionName?: string;
  };
  index?: number;
};

export type ModelProps = Record<string, FieldProps>;
