import { useRouter } from "next/router";

import { ListItemText } from "@mui/material";
import { StyledNavItem, StyledNavItemIcon } from "./styles";
import * as icons from "@mui/icons-material";

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
