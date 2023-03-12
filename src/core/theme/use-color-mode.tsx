import React from "react";
import { ColorModeContext } from "./provider";

export const useColorMode = () => React.useContext(ColorModeContext);
