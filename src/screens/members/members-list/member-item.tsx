import {
  Box,
  Card,
  Typography,
  Stack,
  CardActionArea,
  Chip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Avatar } from "components/avatar";
import React from "react";
import { UserModel } from "schema";

const StyledImg = styled("img")({
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
});

type MembersListItemProps = {
  item: UserModel;
  onClick: () => void;
};

export default function MembersListItem({
  item,
  onClick,
}: MembersListItemProps) {
  const { _id, email, photoUrl, role } = item;

  return (
    <Card>
      <CardActionArea onClick={onClick}>
        <Stack direction="row" alignItems="center" gap={4} sx={{ p: 2 }}>
          <Box>
            <Avatar src={photoUrl} title={email} />
          </Box>

          <Box sx={{ minWidth: 0 }}>
            <Typography variant="subtitle2" noWrap>
              {email}
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.6 }} noWrap>
              {role}
            </Typography>
          </Box>

          <Box>
            {item.neverLoggedIn && (
              <Chip
                size="small"
                label="Pending"
                color="warning"
                variant="outlined"
              />
            )}
          </Box>
        </Stack>
      </CardActionArea>
    </Card>
  );
}
