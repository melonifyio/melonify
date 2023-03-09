import { useSignInByLink } from "features/auth/api/sign-in";
import { useDataProvider } from "features/data";
import { useRouter } from "next/router";
import { UserModel } from "schema";

type UseSignUpByLinkProps = {
  email: string;
};

export function useSignUpByLink({ email }: UseSignUpByLinkProps) {
  const router = useRouter();
  const { useUpdateDocument } = useDataProvider();
  const [updateUser] = useUpdateDocument<Partial<UserModel>>({
    collectionId: "users",
    documentId: email,
    merge: true,
  });

  const res = useSignInByLink({
    onSuccess: () => {
      updateUser({
        neverLoggedIn: false,
      });

      router.push("/");
    },
    onError: () => {
      router.push("/login");
    },
  });

  return res;
}
