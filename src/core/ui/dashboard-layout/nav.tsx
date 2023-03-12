import { useRouter } from "next/router";

import { Avatar, Box, Drawer, IconButton, Stack } from "@mui/material";

import { Menu } from "./menu";
import { Logo } from "./logo";
import { MenuItem, MenuItemProps } from "./menu";
import {
  ChevronLeft,
  ChevronRight,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { StyledDrawer } from "./styled";
import { NAV_WIDTH } from "./header";
import { Denied } from "core/auth";
import { useResponsive } from "core/theme";

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

  const renderContent = (
    <Stack height="100%" gap={2} p={1}>
      <Logo open={openNav} onClick={() => router.push("/")} />

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
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: "background.default",
              borderRightColor: "divider",
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
