import { DocumentData } from "firebase/firestore";
import { useRouter } from "next/router";

import { Box, List, ListItemText, Skeleton } from "@mui/material";
import { StyledNavItem } from "./styles";
import { useApp } from "../../hooks/useApp";

type MenuProps = {
  data: MenuItemProps[];
  isLoading?: boolean;
};

export default function MenuProps({
  data = [],
  isLoading,
  ...other
}: MenuProps) {
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

type MenuItemProps = DocumentData & { _id: string };

function MenuItem(props: MenuItemProps) {
  const { title, _id, home, path, icon, info } = props;

  const router = useRouter();
  const { appData } = useApp();

  return (
    <StyledNavItem
      selected={home ? router.asPath === `/app/${appData?.id}` : router.asPath.includes(_id)}
      onClick={() => {
        router.push(`/app/${appData?.id}/${_id}`);
      }}
      sx={{
        width: "100%",
      }}
    >
      <ListItemText disableTypography primary={title} />

      {info && info}
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
