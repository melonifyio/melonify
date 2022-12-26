import { useState } from "react";
import { useRouter } from "next/router";
// @mui
import { styled } from "@mui/material/styles";
//
import Nav from "./nav";
import RequireAuth from "../require-auth";
import AppProvider from "../app-provider";

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

export default function DashboardLayout(props: DashboardProps) {
  const { children } = props;
  const [open, setOpen] = useState(false);
  const { query } = useRouter();
  const { appId } = query;

  return (
    <RequireAuth>
      <AppProvider appId={appId as string}>
        <StyledRoot>
          {/* <Header onOpenNav={() => setOpen(true)} /> */}
          <Nav openNav={open} onCloseNav={() => setOpen(false)} />
          <Main>{children}</Main>
        </StyledRoot>
      </AppProvider>
    </RequireAuth>
  );
}
