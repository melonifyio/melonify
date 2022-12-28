import { useEffect } from "react";
// @mui
import { Box, Button, Drawer, Typography, Stack } from "@mui/material";

import Menu from "../../components/menu";
import ProjectPopover from "../../components/project-popover";
import AccountPopover from "../../components/account-popover";
import useResponsive from "../../hooks/useResponsive";
import useCollections from "../../hooks/useCollections";
import StartCollectionModal from "../../sections/app/start-collection-modal";

const NAV_WIDTH = 280;

type NavProps = {
  openNav: boolean;
  onCloseNav: () => void;
};

export default function Nav(props: NavProps) {
  const { openNav, onCloseNav } = props;
  const isDesktop = useResponsive("up", "lg");

  const collections = useCollections();

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderContent = (
    <Stack height="100%" gap={4} p={2}>
      <Box>
        <ProjectPopover />
      </Box>

      <Box>
        <Menu data={collections.data || []} isLoading={collections.isLoading} />
      </Box>

      <Box>
        <StartCollectionModal />
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
