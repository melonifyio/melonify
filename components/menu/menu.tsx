import PropTypes from "prop-types";
import Link from "next/link";

import { Box, List, ListItemText } from "@mui/material";
import { StyledNavItem, StyledNavItemIcon } from "./styles";

type MenuProps = {
  data: MenuItemProps[];
};

export default function MenuProps({ data = [], ...other }: MenuProps) {
  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {data.map((item) => (
          <MenuItem key={item.title} {...item} />
        ))}
      </List>
    </Box>
  );
}

type MenuItemProps = {
  title: string;
  path: string;
  info?: string;
  icon?: string;
};

function MenuItem(props: MenuItemProps) {
  const { title, path, icon, info } = props;

  return (
    <StyledNavItem
      component={Link}
      to={path}
      sx={{
        "&.active": {
          color: "text.primary",
          bgcolor: "action.selected",
          fontWeight: "fontWeightBold",
        },
      }}
    >
      <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>

      <ListItemText disableTypography primary={title} />

      {info && info}
    </StyledNavItem>
  );
}
