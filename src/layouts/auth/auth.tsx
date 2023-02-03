import { useRouter } from "next/router";
import { useAuthUser } from "@react-query-firebase/auth";

import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

import auth from "config/auth";

type AuthLayoutProps = {
  children: React.ReactNode;
};

export default function Auth({ children }: AuthLayoutProps) {
  const router = useRouter();
  const user = useAuthUser(["user"], auth);

  if (user.isLoading) {
    return (
      <Stack
        direction="row"
        height="100vh"
        alignItems="center"
        justifyContent="center"
      >
        <CircularProgress size={24} />
      </Stack>
    );
  }

  if (user.data) {
    router.push("/");
    return null;
  }

  return <>{children}</>;
}
