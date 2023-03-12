import { alpha, styled } from "@mui/material/styles";
import {
  Card,
  CardActionArea,
  CSSObject,
  LinearProgress,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/system";

const StyledIcon = styled("div")(({ theme }) => ({
  margin: "auto",
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  width: theme.spacing(6),
  height: theme.spacing(6),
  justifyContent: "center",
  marginBottom: theme.spacing(2),
}));

type SummaryProps = {
  title: string;
  total: number;
  icon: JSX.Element;
  color: string;
  onClick?: () => void;
  isLoading?: boolean;
  sx?: CSSObject;
};

export function Summary({
  title,
  total,
  icon,
  color = "primary",
  onClick,
  isLoading,
  sx,
  ...other
}: SummaryProps) {
  const theme = useTheme();

  return (
    <Card
      sx={{
        boxShadow: "none",
        textAlign: "center",
        color: theme.palette[color].darker,
        bgcolor: alpha(theme.palette[color].lighter, 0.7),
        ...sx,
      }}
      {...other}
    >
      <CardActionArea onClick={onClick} sx={{ py: 2 }}>
        <StyledIcon
          sx={{
            color: theme.palette[color].dark,
            backgroundImage: `linear-gradient(135deg, ${alpha(
              theme.palette[color].dark,
              0
            )} 0%, ${alpha(theme.palette[color].dark, 0.24)} 100%)`,
          }}
        >
          {icon}
        </StyledIcon>
        <Typography variant="h6">{total}</Typography>
        <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
          {title}
        </Typography>
      </CardActionArea>

      {isLoading && <LinearProgress />}
    </Card>
  );
}
