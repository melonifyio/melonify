import { useRouter } from "next/router";
import { collection, orderBy, query } from "firebase/firestore";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Unstable_Grid2";

import Card from "components/elements/card";
import { Typography } from "@mui/material";

type CollectionsListProps = {
  collectionName: string;
  emptyState?: JSX.Element;
};

export default function CollectionsList(props: CollectionsListProps) {
  const { collectionName, emptyState } = props;

  const router = useRouter();

  // if (isLoading) return <CircularProgress />;

  // if (data.length === 0) return emptyState || <Typography>Empty</Typography>;

  return (
    <>
      <Grid container spacing={2}>
        {/* {data.map((item) => (
          <Grid key={item._id} xs={3}>
            <Card
              title={item.collectionId}
              onClick={() => {
                router.push(`/${item._id}`);
              }}
            />
          </Grid>
        ))} */}
        collections list
      </Grid>
    </>
  );
}
