import { useRouter } from "next/router";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";

import useFirebaseAuth from "hooks/useFirebaseAuth";

type PrivateProps = {
  children: React.ReactNode;
};

export default function Private(props: PrivateProps) {
  const { children } = props;
  const router = useRouter();
  const { isLoading, profile } = useFirebaseAuth();

  if (isLoading) {
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

  if (!profile) {
    router.push("/login");
  }

  if (profile) {
    return <>{children}</>;
  }

  return <></>;
}
