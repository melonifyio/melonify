import { useRouter } from "next/router";
import { useAuthUser } from "@react-query-firebase/auth";

import auth from "../firebase/auth";

// ----------------------------------------------------------------------

type RequireAuthProps = {
  children: React.ReactNode;
};

export default function RequireAuthLayout(props: RequireAuthProps) {
  const { children } = props;
  const router = useRouter();
  const user = useAuthUser(["user"], auth);

  if (user.isLoading) {
    return <div>Loading...</div>;
  }

  if (!user.data) {
    router.push("/login");
  }

  if (user.data) {
    return <>{children}</>;
  }

  return <></>;
}
