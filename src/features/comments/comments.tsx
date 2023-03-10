import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { useDataProvider } from "features/data";
import { CommentModel } from "schema";
import { Comment } from "./comment";
import { Compose } from "./compose";

type CommentsProps = {
  collectionId: string;
};

export function Comments(props: CommentsProps) {
  const { collectionId } = props;

  const { useDocuments } = useDataProvider();

  const [data, isLoading] = useDocuments<CommentModel>({
    collectionId,
    sort: [{ field: "createdAt", dir: "asc" }],
  });

  if (isLoading)
    return (
      <Stack direction="row" alignItems="center" justifyContent="center">
        <CircularProgress size={24} />
      </Stack>
    );

  return (
    <Stack gap={1}>
      <Typography variant="subtitle1">Comments</Typography>

      {(data || []).map((item) => (
        <Comment key={item._id} item={item} />
      ))}

      <Box sx={{ mt: 2 }}>
        <Compose collectionId={collectionId} />
      </Box>
    </Stack>
  );
}
