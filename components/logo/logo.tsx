import PropTypes from "prop-types";
import { forwardRef } from "react";
import Link from "next/link";
// @mui
import { useTheme } from "@mui/material/styles";
import { Avatar, Box } from "@mui/material";

// ----------------------------------------------------------------------

type LogoProps = {
  title: string;
  src?: string;
};

const Logo = (props: LogoProps) => {
  const { title, src } = props;
  const theme = useTheme();

  const logo = (
    <Avatar src={src} sx={{ borderRadius: 1, width: 44, height: 44 }}>
      {title ? title.charAt(0) : ""}
    </Avatar>
  );

  return logo;
};

export default Logo;
