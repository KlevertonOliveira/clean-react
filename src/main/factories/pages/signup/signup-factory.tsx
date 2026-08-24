import { SignUpPage } from "@/presentation/pages";
import { makeLocalUpdateCurrentAccount } from "../../usecases/update-current-account/local-update-current-account-factory";
import { makeSignUpValidation } from "./signup-validation-factory";
import { makeRemoteAddAccount } from "../../usecases/add-account/remote-add-account-factory";

export default function MakeSignUp(): React.JSX.Element {
  return (
    <SignUpPage
      addAccount={makeRemoteAddAccount()}
      validation={makeSignUpValidation()}
      updateCurrentAccount={makeLocalUpdateCurrentAccount()}
    />
  );
}
