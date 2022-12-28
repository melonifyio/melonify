export type FieldProps = {
  fieldKey: string;
  name: string;
  type: "TEXT" | "NUMBER" | "MAP" | "ENUM";
  config?: {
    model?: {
      fields: Record<string, FieldProps>;
    };
    options?: string[];
  };
};
