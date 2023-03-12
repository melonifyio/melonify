import { alpha, Theme } from "@mui/material/styles";

// ----------------------------------------------------------------------

export default function Button(theme: Theme) {
  return {
    MuiButton: {
      styleOverrides: {
        root: {},
      },
      defaultProps: {
        // disableRipple: true,
      },
    },
  };
}
