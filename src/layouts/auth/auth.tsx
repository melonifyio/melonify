import { useRouter } from "next/router";
import { Timestamp } from "firebase/firestore";

import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

import auth from "services/firebase/auth";

type AuthLayoutProps = {
  children: React.ReactNode;
};

export default function Auth({ children }: AuthLayoutProps) {
  const router = useRouter();

  return <>{children}</>;
}
