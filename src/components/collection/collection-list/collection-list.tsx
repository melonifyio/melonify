import { useRouter } from "next/router";
import Grid from "@mui/material/Unstable_Grid2";

import Card from "components/elements/card";
import { Typography } from "@mui/material";
import CollectionListItem from "./collection-list-item";

type CollectionListProps = {
  data: Record<
    string,
    {
      id: string;
    }
  >;
  emptyState?: JSX.Element;
};

export default function CollectionList(props: CollectionListProps) {
  const { data, emptyState } = props;

  const router = useRouter();

  // if (data.length === 0) return emptyState || <Typography>Empty</Typography>;

  return (
    <>
      <Grid container spacing={2} gridColumn={12}>
        {Object.keys(data).map((collectionKey) => (
          <Grid key={data[collectionKey].id} xs={12} md={3}>
            <CollectionListItem
              title={data[collectionKey].id}
              collectionKey={collectionKey}
              collectionId={data[collectionKey].id}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
