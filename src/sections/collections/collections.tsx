import { useRouter } from "next/router";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Unstable_Grid2";

import useCollections from "hooks/use-collections";
import Card from "components/card";
import EmptyState from "components/empty-state";
import StartCollection from "sections/start-collection";

export default function Collections() {
  const { data = [], isLoading } = useCollections();
  const router = useRouter();

  if (isLoading) return <CircularProgress />;

  if (data.length === 0)
    return (
      <EmptyState
        title="Get started"
        description="Start your first collection"
        actions={<StartCollection />}
      />
    );

  return (
    <Grid container spacing={2}>
      {data.map((item) => (
        <Grid key={item._id} xs={3}>
          <Card
            title={item.title}
            onClick={() => {
              router.push(`/${item._id}`);
            }}
          />
        </Grid>
      ))}
    </Grid>
  );
}
