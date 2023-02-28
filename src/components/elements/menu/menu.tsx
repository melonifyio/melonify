import { useRouter } from "next/router";

import { Box, List, ListItemText, Skeleton } from "@mui/material";
import { StyledNavItem, StyledNavItemIcon } from "./styles";
import * as icons from "@mui/icons-material";

type MenuProps = {
  children?: React.ReactNode;
  data?: MenuItemProps[];
  isLoading?: boolean;
  open?: boolean;
};

export default function Menu({
  data,
  isLoading,
  open,
  children,
  ...other
}: MenuProps) {
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

export type MenuItemProps = {
  title: string;
  path: string;
  icon: keyof typeof icons;
  home?: boolean;
  open?: boolean;
};

export function MenuItem(props: MenuItemProps) {
  const { title, path, home, icon, open } = props;

  const router = useRouter();

  const IconComponent = icons[icon || "Folder"];

  return (
    <StyledNavItem
      selected={home ? router.asPath === `/` : router.asPath.includes(path)}
      onClick={() => {
        router.push(`/${path}`);
      }}
      sx={{
        width: "100%",
        pl: 1,
        gap: 2,
      }}
    >
      <StyledNavItemIcon sx={{ p: 2 }}>
        <IconComponent fontSize="small" />
      </StyledNavItemIcon>
      {open && <ListItemText disableTypography primary={title} />}
    </StyledNavItem>
  );
}

function MenuItemPlaceholder() {
  return (
    <Box height={34}>
      <Skeleton width="70%" />
    </Box>
  );
}
