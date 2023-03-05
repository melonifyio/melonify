import * as React from "react";
import { ZodType } from "zod";

import { Box } from "@mui/material";

import { Table, RolesAllowedProps } from "../table/table";
import { TableDrawerTabs } from "./table-drawer-tabs";

type TableDrawerSubcollectionsProps = {
  collectionId: string;
  documentId: string;
  rolesAllowed?: RolesAllowedProps;
  subcollections?: { id: string; label: string; schema: ZodType }[];
};

export const TableDrawerSubcollections = (
  props: TableDrawerSubcollectionsProps
) => {
  const { subcollections = [], collectionId, documentId, rolesAllowed } = props;

  return (
    <Box>
      <TableDrawerTabs
        tabs={subcollections.map((item) => ({
          label: item.label,
        }))}
        panes={subcollections.map((item) => (
          <Table
            key={item.id}
            collectionId={`${collectionId}/${documentId}/${item.id}`}
            schema={item.schema}
            columns={{}}
            rolesAllowed={rolesAllowed}
          />
        ))}
      />
    </Box>
  );
};
