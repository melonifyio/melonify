import { Avatar, Box, Card, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import React from "react";
import { CommentModel } from "schema";
import { convertTimestampToDate } from "utils/date";
import { CommentActions } from "./comment-actions";
import { CommentForm } from "./comment-form";

dayjs.extend(relativeTime);

type CommentProps = {
  item: CommentModel;
  collectionId: string;
};

export function Comment(props: CommentProps) {
  const { item, collectionId } = props;
  const { content, createdBy } = item;

  const [isEditing, setIsEditing] = React.useState(false);

  return (
    <Card sx={{ p: 2 }}>
      <Stack direction="row" gap={2}>
        <Box>
          <Avatar src={createdBy?.photoUrl} title={createdBy?.email || ""} />
        </Box>

        <Box sx={{ flex: 1 }}>
          {isEditing ? (
            <CommentForm
              item={item}
              collectionId={collectionId}
              onCancel={() => setIsEditing(false)}
              onSuccess={() => setIsEditing(false)}
            />
          ) : (
            <>
              <Stack direction="row" alignItems="center" gap={1}>
                <Typography variant="subtitle2">{createdBy?.email}</Typography>
                <Typography variant="caption" sx={{ opacity: 0.34 }}>
                  {createdBy?.createdAt
                    ? dayjs(
                        convertTimestampToDate(createdBy.createdAt)
                      ).fromNow()
                    : ""}
                </Typography>
              </Stack>
              <Typography variant="body2">{content}</Typography>
            </>
          )}
        </Box>

        <Box sx={{ marginLeft: "auto" }}>
          <CommentActions
            item={item}
            collectionId={collectionId}
            onClickEdit={() => setIsEditing(true)}
          />
        </Box>
      </Stack>
    </Card>
  );
}
