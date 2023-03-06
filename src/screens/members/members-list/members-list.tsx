import React from "react";
import { z } from "zod";
import { doc, setDoc, Timestamp } from "firebase/firestore";

import { Box, Button, Grid } from "@mui/material";
import { Stack } from "@mui/system";
import { FormFields, FormModal } from "features/forms";
import firestore from "lib/firebase/firestore";
import { useUsers } from "../api/get-users";
import { useSendLink } from "../api/send-invite";
import { MemberDetails } from "./member-details";
import MembersListItem from "./member-item";
import { Add } from "@mui/icons-material";

export function MembersListWidget() {
  const [data] = useUsers();

  const [activeMemberId, setActiveMemberId] = React.useState<string>("");
  const [openInvite, setOpenInvite] = React.useState(false);

  const [sendLink, isSending] = useSendLink({
    onSuccess: () => {
      setOpenInvite(false);
    },
  });

  const handleInvite = async (values: any) => {
    sendLink(values);

    await setDoc(doc(firestore, `users/${values.email}`), {
      ...values,
      neverLoggedIn: false,
      role: "MEMBER",
      createdAt: Timestamp.now(),
    });
  };

  return (
    <Stack gap={2}>
      <Stack direction="row">
        <Box sx={{ flex: 1 }}></Box>
        <Box>
          <Button
            variant="contained"
            onClick={() => setOpenInvite(true)}
            startIcon={<Add />}
          >
            Invite
          </Button>
        </Box>
      </Stack>

      <Grid container spacing={0.4}>
        {(data || []).map((item) => (
          <Grid key={item._id} item xs={12}>
            <MembersListItem
              item={item}
              onClick={() => {
                setActiveMemberId(item._id || "");
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

      <FormModal
        title="Invite member"
        open={openInvite}
        onClose={() => setOpenInvite(false)}
        initialValues={{ email: "" }}
        onSubmit={handleInvite}
        isSubmitting={isSending}
        schema={z.object({
          email: z.string().email(),
        })}
        contentComponent={(props) => (
          <FormFields
            fields={{
              email: {
                label: "Email",
                type: "TEXT",
              },
            }}
            {...props}
          />
        )}
      />
    </Stack>
  );
}
