import * as React from "react";
import Head from "next/head";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import { DashboardLayout } from "layouts";

export default function Home() {
  const [openSuccessToast, setOpenSuccessToast] = React.useState(false);

  const handleCloseSuccessToast = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSuccessToast(false);
  };

  return (
    <Container>
      <Stack gap={4}>
        <Stack direction="row" gap={4} alignItems="center">
          <Typography variant="h4">App Settings</Typography>
        </Stack>

        <Container maxWidth="sm"></Container>
      </Stack>

      <Snackbar
        open={openSuccessToast}
        autoHideDuration={6000}
        onClose={handleCloseSuccessToast}
      >
        <Alert
          onClose={handleCloseSuccessToast}
          severity="success"
          sx={{ width: "100%" }}
        >
          Saved.
        </Alert>
      </Snackbar>
    </Container>
  );
}

Home.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
