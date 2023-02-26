import { useRouter } from "next/router";

import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Chip,
  LinearProgress,
  Typography,
} from "@mui/material";
import useFirestoreCount from "hooks/useFirestoreCount";
import { collection } from "firebase/firestore";
import firestore from "services/firebase/firestore";
import { ChevronRight } from "@mui/icons-material";

type CollectionListItemProps = {
  collectionKey: string;
  collectionId: string;
  title: string;
};

export default function CollectionListItem(props: CollectionListItemProps) {
  const { title, collectionKey, collectionId } = props;

  const router = useRouter();

  const [count, isCounting] = useFirestoreCount(
    ["countCollection"],
    collection(firestore, collectionId)
  );

  const handleClick = () => {
    router.push(`/${collectionKey}`);
  };

  return (
    <Box sx={{ minWidth: 175 }}>
      <Card variant="outlined">
        <CardActionArea onClick={handleClick}>
          <CardContent>
            <Typography variant="h6">{title}</Typography>

            <Typography fontSize="small" sx={{ opacity: 0.34, mt: 4 }}>
              <>{count} documents</>
            </Typography>
          </CardContent>
        </CardActionArea>
        {/* <CardActions>
          <Box>
            <Chip
              size="small"
              variant="outlined"
              sx={{ border: 0, opacity: 0.3 }}
              label={<>{count} documents</>}
            />
          </Box>
          <Box sx={{ flex: 1 }}></Box>
          <Button endIcon={<ChevronRight />} size="small" onClick={handleClick}>
            Open
          </Button>
        </CardActions> */}

        {isCounting && <LinearProgress />}
      </Card>
    </Box>
  );
}
