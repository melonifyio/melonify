import React from "react";
import { sendSignInLinkToEmail } from "firebase/auth";
import auth from "../lib/auth";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import firestore from "../lib/firestore";

type UseSendLinkProps = {
  onSuccess?: () => void;
};

export function useSendInvitationLink(
  options?: UseSendLinkProps
): [({ email }: { email: string }) => Promise<void>, boolean, Error | null] {
  const [isLoading, setIsLoading] = React.useState(false);

  const send = async ({ email }: { email: string }) => {
    setIsLoading(true);

    sendSignInLinkToEmail(auth, email, {
      url: `https://todo.melonify.io/signin_callback?email=${email}`,
      handleCodeInApp: true,
    })
      .then(() => {
        setDoc(doc(firestore, `users/${email}`), {
          email,
          neverLoggedIn: true,
          role: "MEMBER",
          createdAt: Timestamp.now(),
        });

        options && options.onSuccess && options.onSuccess();
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return [send, isLoading, null];
}
