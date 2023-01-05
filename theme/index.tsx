import PropTypes from "prop-types";
import { useMemo } from "react";
// @mui
import { CssBaseline } from "@mui/material";
import {
  ThemeProvider as MUIThemeProvider,
  createTheme,
  StyledEngineProvider,
} from "@mui/material/styles";
//
import palette from "./palette";
import shadows from "./shadows";
import typography from "./typography";
import GlobalStyles from "./globalStyles";
import componentsOverride from "./overrides";

// ----------------------------------------------------------------------

type ThemeProviderProps = {
  children: React.ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const themeOptions = useMemo(
    () => ({
      palette,
      shape: { borderRadius: 10 },
      typography,
      shadows: shadows(),
    }),
    []
  );

  const theme = createTheme(themeOptions as any);
  theme.components = componentsOverride(theme);

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
}
