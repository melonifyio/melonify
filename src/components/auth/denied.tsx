import React from "react";
import { useAuthorization } from "./authorization-context";

type DeniedProps = {
  children: React.ReactNode;
  rolesAllowed?: string[];
  fallback?: JSX.Element | null;
};

export default function Denied(props: DeniedProps) {
  const { children, rolesAllowed, fallback = null } = props;

  const { role } = useAuthorization();

  // RBAC  check if the role is allowed
  if (rolesAllowed) {
    if (rolesAllowed.includes(role || "")) {
      return <>{children}</>;
    } else {
      return fallback;
    }
  }

  return <>{children}</>;
}
