import { AuthLayout } from "layouts";

import { PageHeader } from "components/page-header";
import { Container } from "components/container";
import LoginScreen from "screens/auth/login";

export default function LoginPage() {
  return (
    <Container>
      <LoginScreen />
    </Container>
  );
}

LoginPage.getLayout = function getLayout(page: React.ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};
