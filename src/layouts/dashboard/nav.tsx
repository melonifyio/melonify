import { useEffect } from "react";
import { useRouter } from "next/router";

import { Box, IconButton, Stack } from "@mui/material";

import Menu from "components/elements/menu";
import useResponsive from "hooks/useResponsive";
import Logo from "components/elements/logo";
import { MenuItem, MenuItemProps } from "components/elements/menu/menu";
import { Menu as MenuIcon } from "@mui/icons-material";
import { StyledDrawer } from "./styled";
import { NAV_WIDTH } from "./header";
import Denied from "components/auth/denied";

export type NavItemProps = { rolesAllowed?: string[] } & MenuItemProps;

type NavProps = {
  openNav: boolean;
  onOpenNav: () => void;
  onCloseNav: () => void;
  items: NavItemProps[];
  footerItems?: MenuItemProps[];
};

export default function Nav(props: NavProps) {
  const { openNav, onOpenNav, onCloseNav, items = [], footerItems } = props;
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
        <Box p={1}>
          <IconButton
            size="small"
            onClick={() => (openNav ? onCloseNav() : onOpenNav())}
          >
            <MenuIcon />
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
        <Menu data={footerItems || []} />
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
              borderRightStyle: "dashed",
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
