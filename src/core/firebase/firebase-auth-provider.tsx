import { AuthContextProps } from "../auth";
import { useAuthUser } from "./hooks/use-auth-user";
import { useSendInvitationLink } from "./hooks/use-send-invitation-link";
import { useFirebaseSignInViaGoogle } from "./hooks/use-sign-in";
import { useFirebaseSignOut } from "./hooks/use-sign-out";
import { useSignInWithEmailLink } from "./hooks/use-sign-with-email-link";

export function firebaseAuthProvider(): AuthContextProps {
  return {
    useLoginViaGoogle: (options) => {
      const res = useFirebaseSignInViaGoogle(options);

      return res;
    },
    useLogout: () => {
      const res = useFirebaseSignOut();

      return res;
    },
    usePermissions: () => {
      return {
        role: "MEMBER",
      };
    },
    useProfile: () => {
      const [profile, isLoading] = useAuthUser();

      return [profile, isLoading, null];
    },
    useCheckIfLoggedIn: () => {
      const [profile, isLoading] = useAuthUser();

      return [!!profile, isLoading, null];
    },
    useSendLink: (options?: { onSuccess?: () => void }) => {
      return useSendInvitationLink(options);
    },
    useSignInByLink: (options) => {
      return useSignInWithEmailLink(options);
    },
  };
}
