// @mui
import { alpha, styled } from "@mui/material/styles";
import { Card, CSSObject, Typography } from "@mui/material";
import { useTheme } from "@mui/system";
import { ShoppingBag } from "@mui/icons-material";

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

type SalesSummaryProps = {
  title?: string;
  total?: number;
  icon?: JSX.Element;
  color?: string;
  sx?: CSSObject;
};

export function SalesSummary({
  title,
  total,
  icon,
  color = "primary",
  sx,
  ...other
}: SalesSummaryProps) {
  const theme = useTheme();

  return (
    <Card
      sx={{
        py: 2,
        boxShadow: 0,
        textAlign: "center",
        color: theme.palette[color].darker,
        bgcolor: alpha(theme.palette[color].lighter, 0.8),
        ...sx,
      }}
      {...other}
    >
      <StyledIcon
        sx={{
          color: theme.palette[color].dark,
          backgroundImage: `linear-gradient(135deg, ${alpha(
            theme.palette[color].dark,
            0
          )} 0%, ${alpha(theme.palette[color].dark, 0.24)} 100%)`,
        }}
      >
        <ShoppingBag />
      </StyledIcon>

      <Typography variant="subtitle2">423423</Typography>

      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        {title}
      </Typography>
    </Card>
  );
}
