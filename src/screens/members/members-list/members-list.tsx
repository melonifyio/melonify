import { Box, Button, Divider, Grid } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { useUsers } from "../api/get-users";
import { MemberDetails } from "./member-details";
import MembersListItem from "./member-item";

export function MembersListWidget() {
  const [data] = useUsers();

  const [activeMemberId, setActiveMemberId] = React.useState<string>("");

  return (
    <Stack gap={2}>
      <Stack direction="row">
        <Box sx={{ flex: 1 }}></Box>
        <Box>
          <Button size="small" variant="contained">
            Invite
          </Button>
        </Box>
      </Stack>

      <Grid container spacing={3}>
        {(data || []).map((item) => (
          <Grid key={item._id} item xs={12}>
            <MembersListItem
              item={item}
              onClick={() => {
                setActiveMemberId(item._id);
              }}
            />
          </Grid>
        ))}
      </Grid>

      {!!activeMemberId && (
        <MemberDetails
          open={Boolean(activeMemberId)}
          documentId={activeMemberId}
          onClose={() => setActiveMemberId("")}
          fields={{
            email: {
              label: "Email",
              type: "TEXT",
            },
            role: {
              label: "Role",
              type: "ENUM",
              config: {
                options: ["OWNER", "ADMIN", "MEMBER"],
              },
            },
          }}
        />
      )}
    </Stack>
  );
}
