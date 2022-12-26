import React from "react";
import { AppContext } from "../layouts/app-provider";

export const useApp = () => React.useContext(AppContext);
