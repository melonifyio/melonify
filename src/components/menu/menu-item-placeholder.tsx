import { Box, Skeleton } from "@mui/material";

export function MenuItemPlaceholder() {
  return (
    <Box height={34}>
      <Skeleton width="70%" />
    </Box>
  );
}
