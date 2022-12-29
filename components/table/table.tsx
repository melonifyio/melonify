import * as React from "react";
import { useFirestoreCollectionMutation } from "@react-query-firebase/firestore";
import { getFirestore, collection } from "firebase/firestore";

import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  GridToolbarContainer,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { Button, Box } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

import FormModal from "../../sections/shared/form-modal";
import { FieldProps } from "../form-field/types";
import { useApp } from "../../hooks/useApp";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
  },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 110,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

const CustomToolbar: React.FunctionComponent<{
  setFilterButtonEl: React.Dispatch<
    React.SetStateAction<HTMLButtonElement | null>
  >;
  collectionName: string;
  model: {
    fields: Record<string, FieldProps>;
  };
}> = ({ setFilterButtonEl, collectionName, model }) => {
  const { firebase } = useApp();
  const firestore = getFirestore(firebase);

  const ref = collection(firestore, collectionName);
  const mutation = useFirestoreCollectionMutation(ref);

  const handleSuccess = (data: any) => {
    mutation.mutate(data);
  };

  return (
    <GridToolbarContainer sx={{ justifyContent: "space-between" }}>
      <GridToolbarFilterButton ref={setFilterButtonEl} />

      <FormModal
        onSuccess={handleSuccess}
        isSubmitting={mutation.isLoading}
        model={model}
      />
    </GridToolbarContainer>
  );
};

type SmartTableProps = {
  collectionName: string;
  model: {
    fields: Record<string, FieldProps>;
  };
};

export default function SmartTable(props: SmartTableProps) {
  const { collectionName, model } = props;

  const [filterButtonEl, setFilterButtonEl] =
    React.useState<HTMLButtonElement | null>(null);

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        components={{
          Toolbar: CustomToolbar,
        }}
        componentsProps={{
          panel: {
            anchorEl: filterButtonEl,
          },
          toolbar: {
            setFilterButtonEl,
            model,
            collectionName,
          },
        }}
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
}
