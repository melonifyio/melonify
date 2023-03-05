import { AuthLayout } from "layouts";

import { Container } from "components/container";
import { SignUpByLinkScreen } from "screens/auth/signpUpByLink";

export default function SignUpByLink() {
  return (
    <Container>
      <SignUpByLinkScreen />
    </Container>
  );
}

SignUpByLink.getLayout = function getLayout(page: React.ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};
