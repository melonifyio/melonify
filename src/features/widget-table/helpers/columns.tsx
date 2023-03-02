import * as React from "react";
import { CollectionProps } from "features/collections/types";
import { Field, FieldType } from "features/fields";

export interface IColumn {
  field: string;
  headerName: string;
  width: number;
  flex: number;
  align: "left" | "right";
  renderCell: (item: any) => JSX.Element;
}

const getColumnWidth = (columnType: keyof typeof FieldType): number => {
  if (columnType === "IMAGE") return 64;
  if (columnType === "NUMBER") return 64;

  return 150;
};

const getColumnFlex = (columnType: keyof typeof FieldType): number => {
  if (columnType === "TEXT") return 1;

  return 0;
};

const getColumnAlign = (
  columnType: keyof typeof FieldType
): "left" | "right" => {
  if (columnType === "NUMBER") return "right";

  return "left";
};

export const getColumns = (schema: CollectionProps["schema"]): IColumn[] => {
  return Object.keys(schema)
    .filter((key) => !schema[key].config?.hideTableColumn)
    .map((key) => {
      return {
        field: key,
        headerName: schema[key].label,
        width: getColumnWidth(schema[key].type),
        flex: getColumnFlex(schema[key].type),
        align: getColumnAlign(schema[key].type),
        renderCell: (item) => (
          <Field
            type={schema[key].type}
            value={item[key]}
            config={schema[key].config}
          />
        ),
      };
    });
};
