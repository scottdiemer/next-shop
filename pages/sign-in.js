import Button from "../components/Button";
import Field from "../components/Field";
import Input from "../components/Input";
import Page from "../components/Page";

export default function SignInPage() {
  return (
    <Page title="Sign In">
      <form>
        <Field label="Email">
          <Input type="email" />
        </Field>
        <Field label="Password">
          <Input type="password" />
        </Field>
        <Button type="submit">Sign In</Button>
      </form>
    </Page>
  );
}
