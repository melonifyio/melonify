import * as React from "react";
import { AuthorizationContext } from "../providers/authorization";

export const usePermissions = () => React.useContext(AuthorizationContext);
