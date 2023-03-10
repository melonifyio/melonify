import * as React from "react";
import { ZodType } from "zod";

import Drawer from "@mui/material/Drawer";

import { FormFieldProps } from "features/forms";

import { Tabs } from "components/tabs";
import { TableRolesAllowedProps } from "features/table";
import { TasksDetailsForm } from "./form";
import { TasksDetailsSecurity } from "./security";
import { Comments } from "features/comments";
import { Dialog, Portal } from "@mui/material";

type TasksDetailsModalProps = {
  open: boolean;
  onClose: () => void;
  fields?: Record<string, FormFieldProps>;
  collectionId: string;
  documentId: string;
  schema?: ZodType;
  rolesAllowed?: TableRolesAllowedProps;
};

export const TasksDetailsModal = (props: TasksDetailsModalProps) => {
  const {
    open,
    onClose,
    fields,
    collectionId,
    documentId,
    rolesAllowed,
    schema,
  } = props;

  const [localIsOpen, setLocalIsOpen] = React.useState(false);

  React.useEffect(() => {
    setInterval(() => {
      setLocalIsOpen(open);
    }, 10);
  }, [open]);

  return (
    <Portal>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
        <Tabs
          tabs={[{ label: "General" }, { label: "System" }]}
          panes={[
            <>
              <TasksDetailsForm
                key={0}
                collectionId={collectionId}
                documentId={documentId}
                rolesAllowed={rolesAllowed}
                schema={schema}
                fields={fields}
              />

              <Comments
                collectionId={`${collectionId}/${documentId}/comments`}
              />
            </>,
            <TasksDetailsSecurity
              key={1}
              onClose={onClose}
              collectionId={collectionId}
              documentId={documentId}
            />,
          ]}
        />
      </Dialog>
    </Portal>
  );
};

TasksDetailsModal.displayName = "TasksDetailsModal";
