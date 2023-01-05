import { Theme } from "@mui/material/styles";

export default function Input(theme: Theme) {
  return {
    MuiInput: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          backgroundColor: "#fff",
          border: "1px solid pink",
          fontSize: 16,
          padding: "10px 12px",
          width: "calc(100% - 24px)",
        },
      },
    },
  };
}
