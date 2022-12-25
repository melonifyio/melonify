import PropTypes from "prop-types";
import { memo } from "react";
// @mui
import { Box } from "@mui/material";
//
import { StyledRootScrollbar, StyledScrollbar } from "./styles";

Scrollbar.propTypes = {
  sx: PropTypes.object,
  children: PropTypes.node,
};

type ScrollbarProps = {
  sx: object;
  children: React.ReactNode;
};

function Scrollbar({ children, sx, ...other }: ScrollbarProps) {
  const userAgent =
    typeof navigator === "undefined" ? "SSR" : navigator.userAgent;

  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent
    );

  if (isMobile) {
    return (
      <Box sx={{ overflowX: "auto", ...sx }} {...other}>
        {children}
      </Box>
    );
  }

  return (
    <StyledRootScrollbar>
      <StyledScrollbar timeout={500} clickOnTrack={false} sx={sx} {...other}>
        {children}
      </StyledScrollbar>
    </StyledRootScrollbar>
  );
}

export default memo(Scrollbar);
