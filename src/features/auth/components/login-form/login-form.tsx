import * as React from "react";
import { useRouter } from "next/router";

import { Stack } from "@mui/material";

import { useLogin } from "features/auth/api/login";
import { Google } from "@mui/icons-material";
import { doc, getDoc } from "firebase/firestore";
import firestore from "lib/firebase/firestore";
import { LoadingButton } from "@mui/lab";
import { signOut } from "firebase/auth";
import auth from "lib/firebase/auth";

export function LoginForm() {
  const router = useRouter();

  const [isLoading, setIsLoading] = React.useState(false);

  const [handleLogin] = useLogin({
    onSuccess: (res) => {
      setIsLoading(true);

      const docRef = doc(firestore, `users/${res.user.email}`);

      getDoc(docRef)
        .then((res) => {
          if (res.data()) {
            router.push("/");
          } else {
            signOut(auth);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
  });

  return (
    <LoadingButton
      size="large"
      variant="contained"
      fullWidth
      onClick={handleLogin}
      loading={isLoading}
    >
      <Stack direction="row" gap={1} alignItems="center">
        <Google fontSize="small" />
        <div>Continue with Google</div>
      </Stack>
    </LoadingButton>
  );
}
