import { Container } from "core/ui/dashboard-layout";
import { SimpleLayout } from "core/ui/simple-layout";
import { SignInByLinkScreen } from "features/auth/signin_by_link";

export default function SignUpByLink() {
  return (
    <Container>
      <SignInByLinkScreen />
    </Container>
  );
}

SignUpByLink.getLayout = function getLayout(page: React.ReactElement) {
  return <SimpleLayout>{page}</SimpleLayout>;
};
