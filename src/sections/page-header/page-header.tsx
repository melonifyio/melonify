import * as React from "react";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

type PageHeaderProps = {
  title: string;
  subtitle?: string;
};

export default function PageHeader(props: PageHeaderProps) {
  const { title } = props;

  return (
    <Stack>
      <Typography variant="h4">{title}</Typography>

      <Divider sx={{ my: 2 }} />
    </Stack>
  );
}
