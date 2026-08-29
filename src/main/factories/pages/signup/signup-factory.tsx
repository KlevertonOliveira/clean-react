import { SignUpPage } from "@/presentation/pages";
import { makeSignUpValidation } from "./signup-validation-factory";
import { makeLocalUpdateCurrentAccount, makeRemoteAddAccount } from "@/main/factories/usecases";

export default function MakeSignUp(): React.JSX.Element {
  return (
    <SignUpPage
      addAccount={makeRemoteAddAccount()}
      validation={makeSignUpValidation()}
      updateCurrentAccount={makeLocalUpdateCurrentAccount()}
    />
  );
}
