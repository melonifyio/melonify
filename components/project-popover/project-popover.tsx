import { useState } from "react";
import { useRouter } from "next/router";

// @mui
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
} from "@mui/material";

import Logo from "../logo";
import { useApp } from "../../hooks/useApp";

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: "App Settings",
    icon: "eva:home-fill",
  },
];

// ----------------------------------------------------------------------

export default function ProjectPopover() {
  const [open, setOpen] = useState<HTMLButtonElement | null>();

  const { appData } = useApp();
  const router = useRouter();

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
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
              <Logo />
            </Box>

            <Box>
              <Box alignItems="flex-start">
                <Typography variant="subtitle2" noWrap>
                  {appData?.title}
                </Typography>
                {/* <Typography
                  variant="caption"
                  sx={{ color: "text.secondary" }}
                  noWrap
                >
                  {appData?.label}
                </Typography> */}
              </Box>
            </Box>
          </Stack>
        </CardActionArea>
      </Card>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
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
        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={handleClose}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: "dashed" }} />

        <MenuItem
          onClick={() => {
            router.push("/");
          }}
          sx={{ m: 1 }}
        >
          Switch App
        </MenuItem>
      </Popover>
    </>
  );
}
