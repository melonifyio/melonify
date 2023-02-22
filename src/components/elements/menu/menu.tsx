import { useRouter } from "next/router";

import { Box, List, ListItemText, Skeleton } from "@mui/material";
import { StyledNavItem } from "./styles";

type MenuProps = {
  data: MenuItemProps[];
  isLoading?: boolean;
};

export default function Menu({ data = [], isLoading, ...other }: MenuProps) {
  return (
    <Box {...other}>
      <List disablePadding>
        {isLoading &&
          [0, 1, 2].map((item) => <MenuItemPlaceholder key={item} />)}

        {data.map((item) => (
          <MenuItem key={item.title} {...item} />
        ))}
      </List>
    </Box>
  );
}

type MenuItemProps = {
  _id: string;
  title: string;
  home: boolean;
};

function MenuItem(props: MenuItemProps) {
  const { title, _id, home } = props;

  const router = useRouter();

  return (
    <StyledNavItem
      selected={home ? router.asPath === `/` : router.asPath.includes(_id)}
      onClick={() => {
        router.push(`/${_id}`);
      }}
      sx={{
        width: "100%",
      }}
    >
      <ListItemText disableTypography primary={title} />
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
