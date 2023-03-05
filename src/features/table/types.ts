import { FieldReferenceConfig, FieldType } from "features/fields";

export interface IColumn {
  headerName: string;
  type: keyof typeof FieldType;
  width?: number;
  flex?: number;
  align?: "left" | "right";
  renderCell?: (item: any) => JSX.Element;
  config?: FieldReferenceConfig;
}
