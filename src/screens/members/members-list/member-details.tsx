import * as React from "react";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

import { ConfirmationDialog } from "components/confirmation-dialog";

import { Form, FormFieldProps, FormFields } from "features/forms";
import { useUser } from "../api/get-user";
import { Denied } from "features/auth";
import { Button, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { RolesAllowedProps } from "features/table";
import { useUpdateUser } from "../api/update-user";

type MemberDetailsProps = {
  open: boolean;
  onClose: () => void;
  documentId: string;
  fields?: Record<string, FormFieldProps>;
  rolesAllowed?: RolesAllowedProps;
};

export const MemberDetails = (props: MemberDetailsProps) => {
  const { open, onClose, documentId, fields, rolesAllowed } = props;

  const [data, isLoading] = useUser({ documentId });

  const [updateUser, isUpdating] = useUpdateUser({ documentId });

  const [localIsOpen, setLocalIsOpen] = React.useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = React.useState(false);

  React.useEffect(() => {
    setInterval(() => {
      setLocalIsOpen(open);
    }, 10);
  }, [open]);

  if (isLoading) {
    return (
      <Stack
        direction="row"
        height="100%"
        alignItems="center"
        justifyContent="center"
      >
        <CircularProgress size={24} />
      </Stack>
    );
  }

  return (
    <Drawer anchor="right" open={localIsOpen} onClose={onClose}>
      <Form
        height="100%"
        initialValues={data}
        onSubmit={updateUser}
        contentComponent={(fieldProps) => (
          <Stack width={680} maxWidth={800} sx={{ height: "100%" }}>
            <Box sx={{ p: 2, borderBottom: 1, borderColor: "divider" }}>
              <Box>
                <Typography variant="subtitle1">Edit user</Typography>
              </Box>
            </Box>

            <Box sx={{ flex: 1, overflowY: "auto" }}>
              <FormFields fields={fields || {}} {...fieldProps} />
            </Box>

            <Denied rolesAllowed={rolesAllowed && rolesAllowed["update"]}>
              <Box
                sx={{
                  p: 2,
                  borderTop: 1,
                  borderColor: "divider",
                  display: "flex",
                }}
              >
                <Box sx={{ flex: 1 }}></Box>
                <Stack direction="row" gap={1}>
                  <Button onClick={onClose}>Close</Button>

                  <LoadingButton
                    type="submit"
                    variant="contained"
                    loading={isUpdating}
                  >
                    Update
                  </LoadingButton>
                </Stack>
              </Box>
            </Denied>
          </Stack>
        )}
      />

      <ConfirmationDialog
        open={openDeleteAlert}
        title="Delete document"
        description="Are you sure?"
        onClose={() => setOpenDeleteAlert(false)}
        onConfirm={() => {}}
        isSubmitting
      />
    </Drawer>
  );
};
