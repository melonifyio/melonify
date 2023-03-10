import { Box, Card, Stack, Typography } from "@mui/material";
import { Avatar } from "components/avatar";
import { CommentModel } from "schema";
import { formatDate } from "utils/format_date";

type CommentProps = {
  item: CommentModel;
};

export function Comment(props: CommentProps) {
  const { item } = props;
  const { content, createdBy } = item;

  return (
    <Card sx={{ p: 2 }}>
      <Stack direction="row" gap={2}>
        <Box>
          <Avatar src={createdBy?.photoUrl} title={createdBy?.email || ""} />
        </Box>
        <Box>
          <Stack direction="row" alignItems="center" gap={1}>
            <Typography variant="subtitle2">{createdBy?.email}</Typography>
            <Typography variant="caption" sx={{ opacity: 0.34 }}>
              {formatDate(createdBy?.createdAt)}
            </Typography>
          </Stack>
          <Typography variant="body2">{content}</Typography>
        </Box>
      </Stack>
    </Card>
  );
}
