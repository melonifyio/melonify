import { useEffect } from "react";
import { useRouter } from "next/router";

import { Box, IconButton, Stack } from "@mui/material";

import { Menu } from "components/menu";
import useResponsive from "hooks/useResponsive";
import { Logo } from "components/logo";
import { MenuItem, MenuItemProps } from "components/menu";
import {
  ChevronLeft,
  ChevronRight,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { StyledDrawer } from "./styled";
import { NAV_WIDTH } from "./header";
import { Denied } from "features/auth";
import { Avatar } from "components/avatar";
import { firebaseConfig } from "lib";

export type NavItemProps = { rolesAllowed?: string[] } & MenuItemProps;

type NavProps = {
  openNav: boolean;
  onOpenNav: () => void;
  onCloseNav: () => void;
  items: NavItemProps[];
  footerItems?: NavItemProps[];
};

export default function Nav(props: NavProps) {
  const {
    openNav,
    onOpenNav,
    onCloseNav,
    items = [],
    footerItems = [],
  } = props;

  const isDesktop = useResponsive("up", "lg");

  const router = useRouter();

  useEffect(() => {
    // if (!isDesktop) {
    //   onCloseNav();
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderContent = (
    <Stack height="100%" gap={2} p={1}>
      <Stack direction="row" gap={0} p={0}>
        <Box p={0}>
          <IconButton onClick={() => router.push("/")}>
            <Avatar
              sx={{ width: 32, height: 32 }}
              src=""
              title={firebaseConfig.projectId || ""}
            />
          </IconButton>
        </Box>
        <Logo onClick={() => router.push("/")} />
      </Stack>

      <Box>
        <Menu open={openNav}>
          {items.map((item) => (
            <Denied key={item.path} rolesAllowed={item.rolesAllowed}>
              <MenuItem open={openNav} {...item} />
            </Denied>
          ))}
        </Menu>
      </Box>

      <Box sx={{ flexGrow: 1 }} />

      <Box>
        <Menu open={openNav}>
          {footerItems.map((item) => (
            <Denied key={item.path} rolesAllowed={item.rolesAllowed}>
              <MenuItem open={openNav} {...item} />
            </Denied>
          ))}
        </Menu>
      </Box>

      <Box sx={{ p: 0.8 }}>
        <IconButton
          size="small"
          onClick={() => (openNav ? onCloseNav() : onOpenNav())}
        >
          {openNav ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
      </Box>
    </Stack>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
      }}
    >
      {isDesktop ? (
        <StyledDrawer
          open={openNav}
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: "background.default",
              borderRightColor: "divider",
            },
          }}
        >
          {renderContent}
        </StyledDrawer>
      ) : (
        <StyledDrawer
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
        </StyledDrawer>
      )}
    </Box>
  );
}
