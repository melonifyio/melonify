import * as React from "react";

import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";

type HeaderProps = {
  onOpenNav: () => void;
};

const NAV_WIDTH = 280;

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 64;

const StyledRoot = styled(AppBar)(({ theme }) => ({
  background: "transparent",
  boxShadow: "none",
  [theme.breakpoints.up("lg")]: {
    width: `calc(100% - ${NAV_WIDTH + 1}px)`,
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up("lg")]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

export default function Header(props: HeaderProps) {
  return (
    <StyledRoot>
      <StyledToolbar>
        <Box sx={{ flexGrow: 1 }}></Box>
        {/* <Button>Login</Button> */}
      </StyledToolbar>
    </StyledRoot>
  );
}
