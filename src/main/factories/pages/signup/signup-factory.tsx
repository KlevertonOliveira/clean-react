import { SignUpPage } from "@/presentation/pages";
import { makeLocalSaveAccessToken } from "@/main/factories/usecases/save-access-token/save-access-token-factory";
import { makeSignUpValidation } from "./signup-validation-factory";
import { makeRemoteAddAccount } from "../../usecases/add-account/remote-add-account-factory";

export default function MakeSignUp(): React.JSX.Element {
  return (
    <SignUpPage
      addAccount={makeRemoteAddAccount()}
      validation={makeSignUpValidation()}
      saveAccessToken={makeLocalSaveAccessToken()}
    />
  );
}
