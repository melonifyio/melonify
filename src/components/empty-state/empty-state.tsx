import * as React from "react";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export type EmptyStateProps = {
  title: string;
  description?: string;
  actions?: JSX.Element;
};

export default function SmartForm(props: EmptyStateProps) {
  const { title, description, actions } = props;

  return (
    <Stack justifyContent="center" alignItems="center" p={12} gap={2}>
      <Typography variant="h5">{title}</Typography>
      {description && <Typography>{description}</Typography>}
      {actions && actions}
    </Stack>
  );
}
