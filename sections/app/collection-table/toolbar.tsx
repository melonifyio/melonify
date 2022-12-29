import * as React from "react";
import { useFirestoreCollectionMutation } from "@react-query-firebase/firestore";
import { getFirestore, collection } from "firebase/firestore";

import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import {
  GridToolbarContainer,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";

import FormModal from "../../shared/form-modal";
import { FieldProps } from "../../../components/form-field/types";
import { useApp } from "../../../hooks/useApp";

export const Toolbar: React.FunctionComponent<{
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
        Trigger={
          <Button startIcon={<AddIcon fontSize="small" />}>Add new item</Button>
        }
      />
    </GridToolbarContainer>
  );
};
