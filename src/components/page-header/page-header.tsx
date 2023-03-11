import * as React from "react";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Head from "next/head";

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  actions?: JSX.Element;
};

export function PageHeader(props: PageHeaderProps) {
  const { title, actions } = props;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <Stack direction="row" gap={2} alignItems="center">
        <Typography variant="h4">{title}</Typography>

        <Box sx={{ flexGrow: 1 }} />

        {actions && actions}
      </Stack>
    </>
  );
}
