import PropTypes from "prop-types";
import Link from "next/link";

import { Box, List, ListItemButton, ListItemText } from "@mui/material";
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
    <StyledNavItem selected onClick={() => {}}>
      <ListItemText disableTypography primary={title} />

      {info && info}
    </StyledNavItem>
  );
}
