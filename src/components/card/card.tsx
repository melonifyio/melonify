import * as React from "react";
import Box from "@mui/material/Box";
import MuiCard from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";

type CardProps = {
  title: string;
  label?: string;
  onClick: () => void;
  dashed?: boolean;
};

export function Card(props: CardProps) {
  const { title, label, onClick, dashed } = props;

  return (
    <Box sx={{ minWidth: 175 }}>
      <MuiCard variant="outlined">
        <CardActionArea onClick={onClick}>
          <CardContent>
            <Typography variant="h6">{title}</Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Box sx={{ flex: 1 }}></Box>
          <Button endIcon={<ChevronRightIcon />} size="small" onClick={onClick}>
            Open
          </Button>
        </CardActions>
      </MuiCard>
    </Box>
  );
}
