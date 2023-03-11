import * as React from "react";
import { ZodType } from "zod";

import MuiTabs from "@mui/material/Tabs";
import MuiTab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";

import { FormFieldProps } from "features/forms";

import { TableRolesAllowedProps } from "features/table";
import { TasksDetailsForm } from "./form";
import { TasksDetailsSecurity } from "./security";
import { Comments } from "features/comments";
import { Divider, IconButton, Stack, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";

type TasksDetailsDrawerProps = {
  open: boolean;
  onClose: () => void;
  fields?: Record<string, FormFieldProps>;
  collectionId: string;
  documentId: string;
  schema?: ZodType;
  rolesAllowed?: TableRolesAllowedProps;
};

export const TasksDetailsDrawer = (props: TasksDetailsDrawerProps) => {
  const {
    open,
    onClose,
    fields,
    collectionId,
    documentId,
    rolesAllowed,
    schema,
  } = props;

  const [tabIndex, setTabIndex] = React.useState(0);
  const [localIsOpen, setLocalIsOpen] = React.useState(false);

  React.useEffect(() => {
    setInterval(() => {
      setLocalIsOpen(open);
    }, 10);
  }, [open]);

  return (
    <Drawer
      anchor="right"
      open={localIsOpen}
      onClose={onClose}
      PaperProps={{
        sx: { width: { xs: "100%", md: 560 } },
      }}
    >
      <Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          px={2}
          py={1}
        >
          <Box>
            <Typography variant="subtitle1">Details</Typography>
          </Box>
          <Box>
            <IconButton onClick={onClose}>
              <Close />
            </IconButton>
          </Box>
        </Stack>
        <MuiTabs
          value={tabIndex}
          onChange={(_, newIndex) => setTabIndex(newIndex)}
          aria-label="basic tabs"
        >
          {[{ label: "General" }, { label: "System" }].map((item, index) => (
            <MuiTab key={index} label={item.label} />
          ))}
        </MuiTabs>
      </Stack>

      <div role="tabpanel" hidden={tabIndex !== 0}>
        {tabIndex === 0 && (
          <Box sx={{ py: 4, px: 2 }}>
            <TasksDetailsForm
              collectionId={collectionId}
              documentId={documentId}
              rolesAllowed={rolesAllowed}
              schema={schema}
              fields={fields}
            />

            <Divider sx={{ my: 2 }} />

            <Comments collectionId={`${collectionId}/${documentId}/comments`} />
          </Box>
        )}
      </div>

      <div role="tabpanel" hidden={tabIndex !== 1}>
        {tabIndex === 1 && (
          <Box sx={{ py: 4, px: 2 }}>
            <TasksDetailsSecurity
              onClose={onClose}
              collectionId={collectionId}
              documentId={documentId}
            />
          </Box>
        )}
      </div>
    </Drawer>
  );
};

TasksDetailsDrawer.displayName = "TasksDetailsDrawer";
