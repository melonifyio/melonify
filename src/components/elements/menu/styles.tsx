// @mui
import { styled } from "@mui/material/styles";
import {
  ListItemIcon,
  ListItemButton,
  ListItemButtonProps,
} from "@mui/material";

export const StyledNavItem = styled(ListItemButton)(({ theme }) => ({
  ...theme.typography.body2,
  height: 44,
  position: "relative",
  color: theme.palette.text.secondary,
  borderRadius: theme.shape.borderRadius,
}));

export const StyledNavItemIcon = styled(ListItemIcon)({
  width: 22,
  height: 22,
  minWidth: 22,
  color: "inherit",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
