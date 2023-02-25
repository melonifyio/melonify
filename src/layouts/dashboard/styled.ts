import { Drawer, AppBarProps as MuiAppBarProps, AppBar } from "@mui/material";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import { NAV_WIDTH } from "./header";

const openedMixin = (theme: Theme): CSSObject => ({
  width: NAV_WIDTH,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const APP_BAR_MOBILE = 24;
const APP_BAR_DESKTOP = 44;

export const StyledRoot = styled("div")(({ theme }) => ({
  display: "flex",
  minHeight: "100%",
  overflow: "hidden",
}));

export const StyledMain = styled("div")(({ theme }) => ({
  flexGrow: 1,
  overflow: "auto",
  minHeight: "100%",
  paddingTop: APP_BAR_MOBILE + 64,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up("lg")]: {
    paddingTop: APP_BAR_DESKTOP + 44,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

export const StyledDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: NAV_WIDTH,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));
