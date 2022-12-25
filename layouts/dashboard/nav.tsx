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
import useResponsive from "../../hooks/useResponsive";

const NAV_WIDTH = 280;

const StyledAccount = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

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
      <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link underline="none">
          <StyledAccount>
            <Avatar src="" alt="photoURL" />

            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
                displayName
              </Typography>

              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                role
              </Typography>
            </Box>
          </StyledAccount>
        </Link>
      </Box>

      <Menu
        data={[
          {
            title: "dashboard",
            path: "/dashboard/app",
            icon: "",
          },
        ]}
      />

      <Box sx={{ flexGrow: 1 }} />
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
