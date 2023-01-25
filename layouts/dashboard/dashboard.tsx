import * as React from "react";
import { useRouter } from "next/router";

// @mui
import { styled } from "@mui/material/styles";
import { Stack } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

//
import Nav from "./nav";
import RequireAuth from "../require-auth";
import AppProvider from "../app-provider";
import useCollections from "../../hooks/useCollections";
import auth from "../../firebase/auth";

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 24;
const APP_BAR_DESKTOP = 44;

const StyledRoot = styled("div")({
  display: "flex",
  minHeight: "100%",
  overflow: "hidden",
});

const Main = styled("div")(({ theme }) => ({
  flexGrow: 1,
  overflow: "auto",
  minHeight: "100%",
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up("lg")]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

type DashboardProps = {
  children: React.ReactNode;
};

function DashboardLayout(props: DashboardProps) {
  const { children } = props;
  const [open, setOpen] = React.useState(false);

  const collections = useCollections();

  if (collections.isLoading) {
    return (
      <Stack
        direction="row"
        height="100vh"
        alignItems="center"
        justifyContent="center"
      >
        <CircularProgress size={24} />
      </Stack>
    );
  }

  return (
    <StyledRoot>
      {/* <Header onOpenNav={() => setOpen(true)} /> */}
      <Nav
        items={collections.data}
        openNav={open}
        onCloseNav={() => setOpen(false)}
      />
      <Main>{children}</Main>
    </StyledRoot>
  );
}

export default function DashboardLayoutWrapper(props: DashboardProps) {
  const { children } = props;
  const { query } = useRouter();
  const { appId } = query;

  return (
    <RequireAuth>
      <AppProvider appId={appId as string}>
        <DashboardLayout>{children}</DashboardLayout>
      </AppProvider>
    </RequireAuth>
  );
}
