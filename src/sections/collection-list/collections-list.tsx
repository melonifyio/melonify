import { useRouter } from "next/router";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Unstable_Grid2";

import useGetDocuments from "hooks/use-get-documents";
import Card from "components/card";
import EmptyState from "components/empty-state";
import StartCollectionButton from "sections/start-collection-button";
import StartCollectionFab from "sections/start-collection-fab/start-collection-fab";
import { Typography } from "@mui/material";

type CollectionsListProps = {
  collectionName: string;
  emptyState?: JSX.Element;
};

export default function CollectionsList(props: CollectionsListProps) {
  const { collectionName, emptyState } = props;

  const { data = [], isLoading } = useGetDocuments({
    collectionName,
  });
  const router = useRouter();

  if (isLoading) return <CircularProgress />;

  if (data.length === 0) return emptyState || <Typography>Empty</Typography>;

  return (
    <>
      <Grid container spacing={2}>
        {data.map((item) => (
          <Grid key={item._id} xs={3}>
            <Card
              title={item.collectionId}
              onClick={() => {
                router.push(`/${item._id}`);
              }}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
