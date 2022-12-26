import * as React from "react";
import Box from "@mui/material/Box";
import MuiCard from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

type CardProps = {
  title: string;
  label: string;
  onClick: () => void;
};

export default function Card(props: CardProps) {
  const { title, label, onClick } = props;

  return (
    <Box sx={{ minWidth: 275 }}>
      <MuiCard variant="outlined">
        <CardActionArea onClick={onClick}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {label}
            </Typography>
            <Typography variant="h5" component="div">
              {title}
            </Typography>
          </CardContent>
        </CardActionArea>
        {/* <CardActions>
          <Button size="small">
            Open
          </Button>
        </CardActions> */}
      </MuiCard>
    </Box>
  );
}
