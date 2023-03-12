import { SimpleLayout } from "core/ui/simple-layout";
import { LoginScreen } from "features/login";

export default function LoginPage() {
  return <LoginScreen />;
}

LoginPage.getLayout = function getLayout(page: React.ReactElement) {
  return <SimpleLayout>{page}</SimpleLayout>;
};
