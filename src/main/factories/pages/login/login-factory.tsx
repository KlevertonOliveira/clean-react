import { LoginPage } from "@/presentation/pages";
import { makeRemoteAuthentication } from "@/main/factories/usecases/authentication/remote-authentication-factory";
import { makeLocalUpdateCurrentAccount } from "@/main/factories/usecases/update-current-account/local-update-current-account-factory";
import { makeLoginValidation } from "./login-validation-factory";

export default function MakeLogin(): React.JSX.Element {
  return (
    <LoginPage
      authentication={makeRemoteAuthentication()}
      validation={makeLoginValidation()}
      updateCurrentAccount={makeLocalUpdateCurrentAccount()}
    />
  );
}
