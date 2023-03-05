import React from "react";
import { sendSignInLinkToEmail } from "firebase/auth";
import auth from "lib/firebase/auth";

type UseSendLinkProps = {
  onSuccess: () => void;
};

export function useSendLink({
  onSuccess,
}: UseSendLinkProps): [({ email }: { email: string }) => void, boolean] {
  const [isLoading, setIsLoading] = React.useState(false);

  const send = async ({ email }: { email: string }) => {
    setIsLoading(true);

    sendSignInLinkToEmail(auth, email, {
      url: `https://melonify.app/signUpByLink?email=${email}`,
      handleCodeInApp: true,
    })
      .then(() => {
        onSuccess();
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return [send, isLoading];
}
