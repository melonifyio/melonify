import { useRouter } from "next/router";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import { useAuthProvider } from "./auth-provider";

type PrivateProps = {
  children: React.ReactNode;
};

export function Private(props: PrivateProps) {
  const { children } = props;

  const router = useRouter();
  const { useCheckIfLoggedIn } = useAuthProvider();

  const [loggedIn, isLoading] = useCheckIfLoggedIn();

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

  // first check if its not logged in redirect to login
  if (!loggedIn) {
    router.push("/login");
  }

  if (loggedIn) {
    return <>{children}</>;
  }

  return <></>;
}
