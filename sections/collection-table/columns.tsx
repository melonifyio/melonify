import * as React from "react";
import { getFirestore, doc } from "firebase/firestore";

import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import {
  GridColDef,
  GridRenderCellParams,
  getGridStringOperators,
} from "@mui/x-data-grid";
import { FieldProps } from "../../components/form-field/types";
import { TableField } from "../../components/table-field/table-field";
import { AlertDialog } from "../../components/alert-dialog";
import { useFirestoreDocumentDeletion } from "@react-query-firebase/firestore";
import { useApp } from "../../hooks/useApp";

const filterOperators = getGridStringOperators()
  .filter(({ value }) => ["startsWith", "equals"].includes(value))
  .reverse();

const getColumnWidth = (columnType: string): number => {
  if (columnType === "IMAGE") return 64;

  return 150;
};

const getColumnFlex = (columnType: string): number => {
  if (columnType === "TEXT") return 1;
  if (columnType === "REFERENCE") return 1;

  return 0;
};

const getFilterable = (columnType: string): boolean => {
  if (columnType === "IMAGE") return false;
  if (columnType === "DATE") return false;

  return true;
};

const DeleteAction = ({
  params,
  collectionName,
  documentId,
  refetch,
}: {
  params: GridRenderCellParams<any>;
  collectionName: string;
  documentId: string;
  refetch: () => void;
}) => {
  const [open, setOpen] = React.useState(false);

  const { firebase } = useApp();
  const firestore = getFirestore(firebase);
  const ref = doc(firestore, collectionName, documentId);
  const mutation = useFirestoreDocumentDeletion(ref);

  return (
    <AlertDialog
      open={open}
      onClose={() => setOpen(false)}
      title="Are you sure?"
      description="Are you sure you want to delete this item?"
      onConfirm={() => {
        mutation.mutate(undefined, {
          onSuccess: () => {
            refetch();
            setOpen(false);
          },
        });
      }}
      isSubmitting={mutation.isLoading}
      TriggerComponent={
        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            setOpen(true);
          }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      }
    />
  );
};

export const columns = (
  model: {
    fields: Record<string, FieldProps>;
  },
  collectionName: string,
  refetch: () => void
): GridColDef[] => {
  const fieldKeys = Object.keys(model.fields || {});
  const fieldKeysSorted = fieldKeys.sort(function (a, b) {
    return (model.fields[a].index || 0) - (model.fields[b].index || 0);
  });

  const transformedColumns = fieldKeysSorted.map((fieldKey) => ({
    field: model.fields[fieldKey].fieldKey,
    headerName: model.fields[fieldKey].name,
    width: getColumnWidth(model.fields[fieldKey].type),
    flex: getColumnFlex(model.fields[fieldKey].type),
    filterable: getFilterable(model.fields[fieldKey].type),
    filterOperators,
    renderCell: (params: GridRenderCellParams<any>) => {
      return (
        <TableField type={model.fields[fieldKey].type} value={params.value} />
      );
    },
  }));

  const actionColumn = {
    field: "actions",
    headerName: "",
    width: 56,
    filterable: false,
    renderCell: (params: GridRenderCellParams<any>) => {
      return (
        <DeleteAction
          params={params}
          collectionName={collectionName}
          documentId={params.id as string}
          refetch={refetch}
        />
      );
    },
  };

  return [...transformedColumns, actionColumn];
};
