import { useState } from "react";
import { useAuthUser } from "@react-query-firebase/auth";
import { useAuthSignOut } from "@react-query-firebase/auth";
// @mui
import { alpha } from "@mui/material/styles";
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
} from "@mui/material";

import auth from "../../firebase/auth";

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
  const user = useAuthUser(["user"], auth);
  const logout = useAuthSignOut(auth);
  const [open, setOpen] = useState<HTMLButtonElement | null>();

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
        <CardActionArea disableRipple onClick={handleOpen}>
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
            <MenuItem disableRipple key={option.label} onClick={handleClose}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: "dashed" }} />

        <MenuItem disableRipple onClick={handleLogout} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </Popover>
    </>
  );
}
