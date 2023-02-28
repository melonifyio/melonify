import { useAuthorization } from "./authorization-context";

type RestrictedProps = {
  children: React.ReactNode;
  rolesAllowed?: string[];
};

export default function Restricted(props: RestrictedProps) {
  const { children, rolesAllowed } = props;

  const { role } = useAuthorization();

  // RBAC  check if the role is allowed
  if (rolesAllowed) {
    if (rolesAllowed.includes(role || "")) {
      console.log(role);
      return <>{children}</>;
    } else {
      return null;
    }
  }

  return <>{children}</>;
}
