import { useRouter } from "next/router";
import { useAuthUser, useAuthIdToken } from "@react-query-firebase/auth";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";

import auth from "../firebase/auth";
import { api } from "../services";

// ----------------------------------------------------------------------

type RequireAuthProps = {
  children: React.ReactNode;
};

export default function RequireAuthLayout(props: RequireAuthProps) {
  const { children } = props;
  const router = useRouter();
  const user = useAuthUser(["user"], auth);

  // useAuthIdToken(["token"], auth, {
  //   onSuccess(result) {
  //     if (result) {
  //       localStorage.setItem("token", result.token.token);

  //       api.defaults.headers.common[
  //         "Authorization"
  //       ] = `Bearer ${result.token.token}`;
  //     } else {
  //       localStorage.removeItem("token");
  //     }
  //   },
  // });

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

  if (!user.data) {
    router.push("/login");
  }

  if (user.data) {
    return <>{children}</>;
  }

  return <></>;
}
