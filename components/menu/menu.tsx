import { DocumentData } from "firebase/firestore";
import { useRouter } from "next/router";

import { Box, List, ListItemText } from "@mui/material";
import { StyledNavItem } from "./styles";
import { useApp } from "../../hooks/useApp";

type MenuProps = {
  data: MenuItemProps[];
};

export default function MenuProps({ data = [], ...other }: MenuProps) {
  return (
    <Box {...other}>
      <List disablePadding>
        {data.map((item) => (
          <MenuItem key={item.title} {...item} />
        ))}
      </List>
    </Box>
  );
}

type MenuItemProps = DocumentData & { _id: string };

function MenuItem(props: MenuItemProps) {
  const { title, _id, path, icon, info } = props;

  const router = useRouter();
  const { appData } = useApp();

  return (
    <StyledNavItem
      selected={router.asPath.includes(_id)}
      onClick={() => {
        router.push(`/app/${appData?.id}/${_id}`);
      }}
    >
      <ListItemText disableTypography primary={title} />

      {info && info}
    </StyledNavItem>
  );
}
