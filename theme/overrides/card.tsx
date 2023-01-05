import { Theme } from "@mui/material";

export default function Card(theme: Theme) {
  return {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: theme.shadows[10],
          borderRadius: Number(theme.shape.borderRadius) * 2,
          zIndex: 0, // Fix Safari overflow: hidden with border radius
        },
      },
      // variants: [
      //   {
      //     props: { variant: "dashed" },
      //     style: {
      //       textTransform: "none",
      //       border: `2px dashed grey`,
      //     },
      //   },
      // ],
    },
    // MuiCardHeader: {
    //   defaultProps: {
    //     titleTypographyProps: { variant: "h6" },
    //     subheaderTypographyProps: { variant: "body2" },
    //   },
    //   styleOverrides: {
    //     root: {
    //       padding: theme.spacing(3, 3, 0),
    //     },
    //   },
    // },
    // MuiCardContent: {
    //   styleOverrides: {
    //     root: {
    //       padding: theme.spacing(3),
    //     },
    //   },
    // },
  };
}
