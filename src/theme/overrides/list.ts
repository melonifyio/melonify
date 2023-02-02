import { Theme } from "@mui/material/styles";

export default function List(theme: Theme) {
  return {
    MuiListSubheader: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
        },
      },
    },
  };
}
