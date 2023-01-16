import * as React from "react";
import { useTheme } from "@mui/material";
import { useFirestoreCollectionMutation } from "@react-query-firebase/firestore";
import { getFirestore, collection, Timestamp } from "firebase/firestore";

import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import {
  GridToolbarContainer,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";

import FormModal from "../form-modal";
import { FieldProps } from "../../components/form-field/types";
import { useApp } from "../../hooks/useApp";
import { Box } from "@mui/system";
import urlify from "../../utils/urlify";
import useMe from "../../hooks/useAuth";

export const Toolbar: React.FunctionComponent<{
  setFilterButtonEl: React.Dispatch<
    React.SetStateAction<HTMLButtonElement | null>
  >;
  collectionName: string;
  model: {
    fields: Record<string, FieldProps>;
  };
  error: string;
}> = ({ setFilterButtonEl, collectionName, model, error }) => {
  const theme = useTheme();
  const { firebase } = useApp();
  const firestore = getFirestore(firebase);
  const me = useMe();

  const [open, setOpen] = React.useState(false);

  const ref = collection(firestore, collectionName);
  const mutation = useFirestoreCollectionMutation(ref);

  const timestampsValues = {
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
    owner: {
      uid: me?.data?.uid,
      email: me?.data?.email,
      displayName: me?.data?.displayName,
      photoURL: me?.data?.photoURL,
    },
  };

  // create new document
  const handleSuccess = (data: any) => {
    mutation.mutate({ ...data, ...timestampsValues });
  };

  return (
    <GridToolbarContainer sx={{ justifyContent: "space-between" }}>
      <GridToolbarFilterButton ref={setFilterButtonEl} />

      <Box>
        {
          <div
            dangerouslySetInnerHTML={{
              __html: urlify(
                error,
                "Create an index for this query",
                theme.palette.primary.main
              ),
            }}
          />
        }
      </Box>

      <FormModal
        onSubmit={handleSuccess}
        open={open}
        onTriggerClick={() => setOpen(true)}
        onClose={() => setOpen(false)}
        isSubmitting={mutation.isLoading}
        model={model}
        TriggerComponent={
          <Button startIcon={<AddIcon fontSize="small" />}>Add new item</Button>
        }
      />
    </GridToolbarContainer>
  );
};
