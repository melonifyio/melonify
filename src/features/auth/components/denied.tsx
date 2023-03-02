import React from "react";
import { usePermissions } from "../hooks/use-permisions";

type DeniedProps = {
  children: React.ReactNode;
  rolesAllowed?: string[];
  fallback?: JSX.Element | null;
};

export function Denied(props: DeniedProps) {
  const { children, rolesAllowed, fallback = null } = props;

  const { role } = usePermissions();

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
