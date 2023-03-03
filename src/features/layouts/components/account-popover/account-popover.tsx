import { useState } from "react";
import { useRouter } from "next/router";

import { useTheme } from "@mui/material/styles";
import {
  Box,
  Divider,
  Typography,
  Stack,
  MenuItem,
  Avatar,
  Popover,
  Card,
  CardActionArea,
  Switch,
} from "@mui/material";

import { useColorMode } from "hooks/useColorMode";
import { signOut } from "firebase/auth";
import auth from "lib/firebase/auth";
import { useAuthentication } from "features/auth";

export function AccountPopover() {
  const theme = useTheme();
  const router = useRouter();
  const [open, setOpen] = useState<HTMLButtonElement | null>();
  const colorMode = useColorMode();

  const { profile } = useAuthentication();

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleLogout = () => {
    signOut(auth).then(() => {
      router.push("/login");
    });
  };

  return (
    <>
      <Card
        variant="outlined"
        sx={{ boxShadow: "none", border: 0, backgroundColor: "transparent" }}
      >
        <CardActionArea onClick={handleOpen} sx={{ borderRadius: "100%" }}>
          <Stack direction="row" alignItems="center" p={1} gap={1}>
            <Box>
              <Avatar
                src={profile?.photoURL || ""}
                alt="photoURL"
                sx={{ width: 34, height: 34 }}
              />
            </Box>

            {/* <Box>
              <Box alignItems="flex-start">
                <Typography variant="subtitle2" noWrap>
                  {profile?.displayName}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: "text.secondary" }}
                  noWrap
                >
                  {profile?.email}
                </Typography>
              </Box>
            </Box> */}
          </Stack>
        </CardActionArea>
      </Card>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
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
            {profile?.displayName}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {profile?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Stack sx={{ p: 1 }}>
          {/* {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={handleClose}>
              {option.label}
            </MenuItem>
          ))} */}

          <MenuItem onClick={colorMode.toggleColorMode}>
            <Stack direction="row" justifyContent="space-between" width="100%">
              <span>Dark Mode</span>
              <Switch
                edge="end"
                size="small"
                checked={theme.palette.mode === "dark"}
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
