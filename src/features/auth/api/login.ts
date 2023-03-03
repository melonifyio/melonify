import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import auth from "lib/firebase/auth";

const provider = new GoogleAuthProvider();

type UseLoginProps = {
  onSuccess: () => void;
};

export function useLogin({ onSuccess }: UseLoginProps) {
  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        onSuccess && onSuccess();
      })
      .catch((error) => {});
  };

  return [handleLogin];
}
