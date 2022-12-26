import { useEffect } from "react";
// @mui
import { styled, alpha } from "@mui/material/styles";
import {
  Box,
  Link,
  Button,
  Drawer,
  Typography,
  Avatar,
  Stack,
} from "@mui/material";

import Scrollbar from "../../components/scrollbar";
import Menu from "../../components/menu";
import Logo from "../../components/logo";
import AccountPopover from "../../components/account-popover";
import useResponsive from "../../hooks/useResponsive";

const NAV_WIDTH = 280;

type NavProps = {
  openNav: boolean;
  onCloseNav: () => void;
};

export default function Nav(props: NavProps) {
  const { openNav, onCloseNav } = props;
  const isDesktop = useResponsive("up", "lg");

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Box sx={{ px: 2.5, py: 3, display: "inline-flex" }}>
        <Logo />
      </Box>

      <Box sx={{ px: 1, py: 3 }}>
        <Menu
          data={[
            {
              title: "dashboard",
              path: "/",
              icon: "",
            },
          ]}
        />
      </Box>

      <Box sx={{ flexGrow: 1 }} />

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <AccountPopover />
      </Box>
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: "background.default",
              borderRightStyle: "dashed",
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
