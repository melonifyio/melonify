import * as React from "react";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  actions?: JSX.Element;
};

export default function PageHeader(props: PageHeaderProps) {
  const { title, actions } = props;

  return (
    <>
      <Stack direction="row" gap={2}>
        <Typography variant="h4">{title}</Typography>

        {actions && actions}
      </Stack>

      <Divider light />
    </>
  );
}
