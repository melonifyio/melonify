import { useState } from "react";
import { useAuthUser } from "@react-query-firebase/auth";
import { useAuthSignOut } from "@react-query-firebase/auth";
// @mui
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Divider,
  Typography,
  Stack,
  MenuItem,
  Avatar,
  IconButton,
  Popover,
  Card,
  CardActionArea,
  Switch,
  FormControlLabel,
  ListItem,
  ListItemText,
} from "@mui/material";

import auth from "config/auth";
import { useColorMode } from "hooks/use-color-mode";

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: "Account Settings",
    icon: "eva:home-fill",
  },
  // {
  //   label: "Profile",
  //   icon: "eva:person-fill",
  // },
  // {
  //   label: "Settings",
  //   icon: "eva:settings-2-fill",
  // },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const theme = useTheme();
  const user = useAuthUser(["user"], auth);
  const logout = useAuthSignOut(auth);
  const [open, setOpen] = useState<HTMLButtonElement | null>();
  const colorMode = useColorMode();

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleLogout = () => {
    logout.mutate();
  };

  return (
    <>
      <Card
        variant="outlined"
        sx={{ boxShadow: "none", border: 0, backgroundColor: "transparent" }}
      >
        <CardActionArea onClick={handleOpen}>
          <Stack direction="row" alignItems="center" p={1} gap={1}>
            <Box>
              <Avatar src={user.data?.photoURL || ""} alt="photoURL" />
            </Box>

            <Box>
              <Box alignItems="flex-start">
                <Typography variant="subtitle2" noWrap>
                  {user.data?.displayName}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: "text.secondary" }}
                  noWrap
                >
                  {user.data?.email}
                </Typography>
              </Box>
            </Box>
          </Stack>
        </CardActionArea>
      </Card>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "bottom", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            "& .MuiMenuItem-root": {
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {user.data?.displayName}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {user.data?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={handleClose}>
              {option.label}
            </MenuItem>
          ))}

          {/* <MenuItem>
            <FormControlLabel
              labelPlacement="end"
              componentsProps={{
                typography: {
                  fontSize: "small",
                },
              }}
              control={
                <Switch
                  size="small"
                  checked={theme.palette.mode === "dark"}
                  onChange={colorMode.toggleColorMode}
                />
              }
              label="Dark Mode"
            />
          </MenuItem> */}

          <MenuItem onClick={colorMode.toggleColorMode}>
            <Stack direction="row" justifyContent="space-between" width="100%">
              <span>Dark Mode</span>
              <Switch
                edge="end"
                size="small"
                checked={theme.palette.mode === "dark"}
                // inputProps={{
                //   "aria-labelledby": "switch-list-label-bluetooth",
                // }}
              />
            </Stack>
          </MenuItem>
        </Stack>

        <Divider sx={{ borderStyle: "dashed" }} />

        <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </Popover>
    </>
  );
}
