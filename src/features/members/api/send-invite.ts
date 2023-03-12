import { useAuthProvider } from "core/auth";

export const useSendInvite = (options?: { onSuccess?: () => void }) => {
  const { useSendLink } = useAuthProvider();

  const res = useSendLink(options);

  return res;
};
