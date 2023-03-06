import * as React from "react";

import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { AccountPopover } from "../account-popover";
import { IconButton, PaperProps } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";

type HeaderProps = {
  open: boolean;
  onOpenNav: () => void;
  onCloseNav: () => void;
};

export const NAV_WIDTH = 240;

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 64;

const StyledRoot = styled(AppBar)(({ theme }) => ({
  background: "transparent",
  boxShadow: "none",
  // [theme.breakpoints.up("lg")]: {
  //   width: `calc(100% - ${NAV_WIDTH + 1}px)`,
  // },
}));

const StyledToolbar = styled(Toolbar)<PaperProps & { open: boolean }>(
  ({ open, theme }) => ({
    minHeight: HEADER_MOBILE,
    [theme.breakpoints.up("lg")]: {
      minHeight: HEADER_DESKTOP,
      paddingLeft: open ? NAV_WIDTH + 22 : 64 + 22,
      transition: theme.transitions.create("padding", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
  })
);

export default function Header(props: HeaderProps) {
  const { onOpenNav, open } = props;

  return (
    <StyledRoot position="fixed">
      <StyledToolbar open={open}>
        <IconButton
          onClick={onOpenNav}
          size="small"
          sx={{
            mr: 1,
            color: "text.primary",
            display: { lg: "none" },
          }}
        >
          <MenuIcon fontSize="small" />
        </IconButton>

        <Box sx={{ flexGrow: 1 }}>
          {/* <TextField size="small" placeholder="Search.." /> */}
        </Box>
        <Box>
          <AccountPopover />
        </Box>
      </StyledToolbar>
    </StyledRoot>
  );
}
