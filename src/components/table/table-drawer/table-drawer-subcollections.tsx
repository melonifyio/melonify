import { Box } from "@mui/material";
import { CollectionProps } from "components/collection/types";
import * as React from "react";

import Table from "../table";
import TableDrawerTabs from "./table-drawer-tabs";

type TableDrawerSubcollectionsProps = {
  schema: CollectionProps["schema"];
  collectionId: string;
  documentId: string;
};

export const TableDrawerSubcollections = (
  props: TableDrawerSubcollectionsProps
) => {
  const { schema, collectionId, documentId } = props;

  const subcollectionFieldKeys = Object.keys(schema).filter(
    (key) => schema[key].type === "SUBCOLLECTION"
  );

  return (
    <Box>
      <TableDrawerTabs
        tabs={subcollectionFieldKeys.map((key) => ({
          label: schema[key].label,
        }))}
        panes={subcollectionFieldKeys.map((key) => (
          <Table
            key={key}
            collection={{
              id: `${collectionId}/${documentId}/${key}`,
              schema: schema[key].config?.schema || {},
            }}
          />
        ))}
      />
    </Box>
  );
};
