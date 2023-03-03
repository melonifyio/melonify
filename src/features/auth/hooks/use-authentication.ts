import * as React from "react";

import { AuthenticationContext } from "../providers/authentication";

export const useAuthentication = () => React.useContext(AuthenticationContext);
