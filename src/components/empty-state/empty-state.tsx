import * as React from "react";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export type EmptyStateProps = {
  title: string;
  description?: string;
  actions?: JSX.Element;
};

export function EmptyState(props: EmptyStateProps) {
  const { title, description, actions } = props;

  return (
    <Stack justifyContent="center" alignItems="center" p={12} gap={2}>
      <Typography variant="h5">{title}</Typography>
      {description && <Typography>{description}</Typography>}
      {actions && actions}
    </Stack>
  );
}
