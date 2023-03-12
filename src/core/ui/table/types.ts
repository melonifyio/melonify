import { FieldType } from "../fields";

export interface IColumn {
  headerName: string;
  type: keyof typeof FieldType;
  width?: number;
  flex?: number;
  align?: "left" | "right" | "center";
  renderCell?: (item: any) => JSX.Element;
  config?: any;
}
