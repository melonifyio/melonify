import * as React from "react";
import Box from "@mui/material/Box";
import MuiCard from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

type CardProps = {
  title: string;
  label?: string;
  onClick: () => void;
  dashed?: boolean;
};

export default function Card(props: CardProps) {
  const { title, label, onClick, dashed } = props;

  return (
    <Box sx={{ minWidth: 275 }}>
      <MuiCard variant="outlined">
        {/* <CardActionArea onClick={onClick}> */}
        <CardHeader
          avatar={<Avatar aria-label="recipe">R</Avatar>}
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={title}
          subheader={label}
        />
        <CardContent></CardContent>
        {/* </CardActionArea> */}
        <CardActions>
          <Button size="small" onClick={onClick}>
            Open
          </Button>
        </CardActions>
      </MuiCard>
    </Box>
  );
}
