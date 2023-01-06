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

function urlify(text: string, title?: string, color?: string) {
  var urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(urlRegex, function (url) {
    return (
      '<a href="' +
        url +
        '" target="_blank" style="color: ' +
        color +
        '; ">' +
        title || url + "</a>"
    );
  });
}

const timestampsValues = {
  createdAt: Timestamp.now(),
  updatedAt: Timestamp.now(),
};

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

  const ref = collection(firestore, collectionName);
  const mutation = useFirestoreCollectionMutation(ref);

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
        onSuccess={handleSuccess}
        isSubmitting={mutation.isLoading}
        model={model}
        TriggerComponent={
          <Button startIcon={<AddIcon fontSize="small" />}>Add new item</Button>
        }
      />
    </GridToolbarContainer>
  );
};
