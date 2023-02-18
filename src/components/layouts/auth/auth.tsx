import { useRouter } from "next/router";
import { Timestamp } from "firebase/firestore";
import { useAuthUser } from "@react-query-firebase/auth";

import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

import auth from "config/auth";
import { UpdateUser } from "components/auth/login-form";

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
    return (
      <UpdateUser
        id={user.data.email || "unknown"}
        data={{ email: user.data.email, createdAt: Timestamp.now() }}
      />
    );
  }

  return <>{children}</>;
}
