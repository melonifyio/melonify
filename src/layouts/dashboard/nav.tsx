import { useEffect } from "react";

import { Box, Drawer, Stack, Divider, Typography } from "@mui/material";

import Menu from "components/menu";
import useResponsive from "hooks/use-responsive";
import StartCollection from "features/collections/start";
import AccountPopover from "layouts/dashboard/account-popover";
import Logo from "components/logo";

const NAV_WIDTH = 280;

type NavProps = {
  openNav: boolean;
  onCloseNav: () => void;
  items: any;
};

export default function Nav(props: NavProps) {
  const { openNav, onCloseNav, items = [] } = props;
  const isDesktop = useResponsive("up", "lg");

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderContent = (
    <Stack height="100%" gap={4} p={2}>
      <Box>
        <Logo />
      </Box>

      <Box>
        <Menu data={[{ _id: "", title: "Collections", home: true }]} />
        {/* <Divider sx={{ my: 1 }} /> */}
        <Menu data={items || []} />
      </Box>

      <Box>
        <StartCollection />
      </Box>

      <Box sx={{ flexGrow: 1 }} />

      <Box>
        <AccountPopover />
      </Box>
    </Stack>
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