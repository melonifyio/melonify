import { Theme } from "@mui/material/styles";

export default function FormLabel(theme: Theme) {
  return {
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: 14,
        },
      },
    },
  };
}
