import * as React from "react";
import { ZodType } from "zod";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";

import { FormFieldProps } from "features/forms";

import { Tabs } from "components/tabs";
import { TableRolesAllowedProps } from "features/table";
import { TasksDetailsForm } from "./form";
import { TasksDetailsSecurity } from "./security";
import { Comments } from "features/comments";

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

  const [localIsOpen, setLocalIsOpen] = React.useState(false);

  React.useEffect(() => {
    setInterval(() => {
      setLocalIsOpen(open);
    }, 10);
  }, [open]);

  return (
    <Drawer anchor="right" open={localIsOpen} onClose={onClose}>
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

            <Comments collectionId={`${collectionId}/${documentId}/comments`} />
          </>,
          <TasksDetailsSecurity
            key={1}
            onClose={onClose}
            collectionId={collectionId}
            documentId={documentId}
          />,
        ]}
      />
    </Drawer>
  );
};

TasksDetailsDrawer.displayName = "TasksDetailsDrawer";
