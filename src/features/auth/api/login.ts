import {
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
} from "firebase/auth";

import auth from "lib/firebase/auth";

const provider = new GoogleAuthProvider();

type UseLoginProps = {
  onSuccess: (result: UserCredential) => void;
};

export function useLogin({ onSuccess }: UseLoginProps) {
  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        onSuccess && onSuccess(result);
      })
      .catch((error) => {});
  };

  return [handleLogin];
}
