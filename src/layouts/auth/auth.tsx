import { useRouter } from "next/router";

type AuthLayoutProps = {
  children: React.ReactNode;
};

export default function Auth({ children }: AuthLayoutProps) {
  const router = useRouter();

  return <>{children}</>;
}
