import { Theme } from "@mui/material/styles";

export default function Input(theme: Theme) {
  return {
    MuiInput: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          backgroundColor: "#fff",
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: theme.palette.grey["400"],
          padding: "6px 12px",
          fontSize: 14,
          marginTop: "4px !important",
          "&.Mui-focused": {
            borderColor: theme.palette.primary["main"],
          },
        },
      },
      defaultProps: {
        disableUnderline: true,
      },
    },
  };
}
