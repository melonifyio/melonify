export type FieldProps = {
  fieldKey: string;
  name: string;
  type: "TEXT" | "NUMBER" | "MAP" | "ENUM" | "IMAGE";
  config?: {
    model?: {
      fields: Record<string, FieldProps>;
    };
    options?: string[];
  };
  index?: number;
};

export type ModelProps = {
  fields: Record<string, FieldProps>;
};
