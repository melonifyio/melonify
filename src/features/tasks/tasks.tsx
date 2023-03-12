import * as React from "react";
import { IColumn, Table } from "core/ui/table";
import { taskSchema } from "schema";
import { FormFieldProps } from "core/ui/form";
import { TasksDetailsDrawer } from "./details/drawer";

const COLLECTION_ID = "tasks";

const COLUMNS: Record<string, IColumn> = {
  title: {
    headerName: "Title",
    type: "TEXT",
  },
  done: {
    headerName: "Completed",
    type: "CHECKBOX",
    width: 200,
    align: "center",
  },
  assignedTo: {
    headerName: "Assigned to",
    type: "AVATAR",
    width: 200,
    config: {
      value: "email",
    },
  },
};

const FIELDS: Record<string, FormFieldProps> = {
  title: {
    label: "Title",
    type: "TEXT",
  },
  description: {
    label: "Description",
    type: "TEXTAREA",
  },
  assignedTo: {
    label: "Assigned to",
    type: "REFERENCE",
    config: {
      collectionId: "users",
      optionLabel: "email",
    },
  },
  done: {
    label: "Completed",
    type: "BOOLEAN",
  },
  dueTo: {
    label: "Due to",
    type: "DATE",
  },
};

const ROLES_ALLOWED = {
  create: ["ADMIN", "MEMBER"],
  view: ["ADMIN", "MEMBER"],
  update: ["ADMIN", "MEMBER"],
  delete: ["ADMIN", "MEMBER"],
};

export function TasksScreen() {
  const [activeDocumentId, setActiveDocumentId] = React.useState<string>("");

  return (
    <>
      <Table
        collectionId={COLLECTION_ID}
        onItemClick={(_id) => setActiveDocumentId(_id)}
        schema={taskSchema}
        columns={COLUMNS}
        fields={FIELDS}
        filterTokens={{
          title: {
            defaultOperator: "==",
          },
        }}
        initialValues={{
          description: "",
          done: false,
          dueTo: null,
        }}
      />
      <>
        {!!activeDocumentId && (
          <TasksDetailsDrawer
            open={Boolean(activeDocumentId)}
            documentId={activeDocumentId}
            schema={taskSchema}
            onClose={() => setActiveDocumentId("")}
            collectionId={COLLECTION_ID}
            fields={FIELDS}
            rolesAllowed={ROLES_ALLOWED}
          />
        )}
      </>{" "}
    </>
  );
}
