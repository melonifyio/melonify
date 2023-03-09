import { Screen, Widget } from "features/screen";
import { Table } from "features/table";
import { taskSchema } from "schema";

export function TasksScreen() {
  return (
    <Screen>
      <Widget>
        <Table
          collectionId="tasks"
          schema={taskSchema}
          columns={{
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
          }}
          fields={{
            title: {
              label: "Title",
              type: "TEXT",
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
          }}
          filterTokens={{
            title: {
              defaultOperator: "==",
            },
          }}
          initialValues={{
            done: false,
          }}
        />
      </Widget>
    </Screen>
  );
}
