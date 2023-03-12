import { Box, List } from "@mui/material";
import { MenuItemPlaceholder } from "./menu-item-placeholder";
import { MenuItem, MenuItemProps } from "./menu-item";

type MenuProps = {
  children?: React.ReactNode;
  data?: MenuItemProps[];
  isLoading?: boolean;
  open?: boolean;
};

export function Menu({ data, isLoading, open, children, ...other }: MenuProps) {
  return (
    <Box {...other}>
      <List disablePadding>
        {isLoading &&
          [0, 1, 2].map((item) => <MenuItemPlaceholder key={item} />)}

        {data &&
          data.map((item) => (
            <MenuItem key={item.title} open={open} {...item} />
          ))}

        {children}
      </List>
    </Box>
  );
}
