import { useRouter } from "next/router";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Unstable_Grid2";

import useGetDocuments from "hooks/use-get-documents";
import Card from "components/card";
import EmptyState from "components/empty-state";
import StartCollectionButton from "sections/start-collection-button";
import StartCollectionFab from "sections/start-collection-fab/start-collection-fab";

export default function CollectionsList() {
  const { data = [], isLoading } = useGetDocuments({
    collectionName: "_melonify_/config/collections",
  });
  const router = useRouter();

  if (isLoading) return <CircularProgress />;

  if (data.length === 0)
    return (
      <EmptyState
        title="Get started"
        description="Start your first collection"
        actions={<StartCollectionButton variant="contained" />}
      />
    );

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
