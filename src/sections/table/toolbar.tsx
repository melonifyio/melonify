import * as React from "react";
import { useTheme } from "@mui/material";
import { Timestamp } from "firebase/firestore";

import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import {
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridSelectionModel,
} from "@mui/x-data-grid";

import FormModal from "components/form-modal";
import { FieldProps } from "components/form-fields/types";
import { Box } from "@mui/system";
import urlify from "utils/urlify";
import useMe from "hooks/use-me";
import removeEmpty from "utils/remove-empty";
import FormFields from "components/form-fields/form-fields";
import useCreateDocument from "hooks/use-create-document";
import deleteByValue from "utils/delete-by-value";

export const Toolbar: React.FunctionComponent<{
  setFilterButtonEl: React.Dispatch<
    React.SetStateAction<HTMLButtonElement | null>
  >;
  collectionName: string;
  model: {
    fields: Record<string, FieldProps>;
  };
  error: string;
  refetch: () => void;
}> = ({ setFilterButtonEl, collectionName, model, error, refetch }) => {
  const theme = useTheme();
  const me = useMe();

  const [open, setOpen] = React.useState(false);

  const mutation = useCreateDocument({ collectionName });

  const timestampsValues = {
    createdAt: Timestamp.now(),
    createdBy: {
      uid: me?.data?.uid,
      email: me?.data?.email,
      displayName: me?.data?.displayName,
      photoURL: me?.data?.photoURL,
    },
  };

  // create new document
  const handleSuccess = (data: any) => {
    mutation.mutate(
      { ...removeEmpty(data), ...timestampsValues },
      {
        onSuccess: () => {
          refetch();
          setOpen(false);
        },
      }
    );
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

      <Box>
        <Button
          startIcon={<AddIcon fontSize="small" />}
          onClick={() => setOpen(true)}
        >
          Add new item
        </Button>

        <FormModal
          title="Add new document"
          initialValues={{}}
          onSubmit={handleSuccess}
          open={open}
          onClose={() => setOpen(false)}
          isSubmitting={mutation.isLoading}
          contentComponent={(fieldProps) => (
            <FormFields
              fields={deleteByValue(model, "type", "SUBCOLLECTION")}
              {...fieldProps}
            />
          )}
        />
      </Box>
    </GridToolbarContainer>
  );
};
