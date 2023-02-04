import { useState } from "react";
import { useRouter } from "next/router";

import {
  Box,
  Divider,
  Typography,
  Stack,
  MenuItem,
  Popover,
  Card,
  CardActionArea,
} from "@mui/material";

import Logo from "components/avatar";

const MENU_OPTIONS = [
  {
    id: "settings",
    label: "App Settings",
  },
];

export default function ProjectPopover() {
  const [open, setOpen] = useState<HTMLButtonElement | null>();

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
              <Logo title={process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || ""} />
            </Box>

            <Box>
              <Box alignItems="flex-start">
                <Typography variant="subtitle2" noWrap>
                  {process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || ""}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: "text.secondary" }}
                  noWrap
                >
                  Master
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
            <MenuItem
              key={option.label}
              onClick={() => {
                router.push(`/${option.id}`);
                handleClose();
              }}
            >
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
