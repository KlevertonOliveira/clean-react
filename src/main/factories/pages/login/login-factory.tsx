import { LoginPage } from "@/presentation/pages";
import { makeLocalUpdateCurrentAccount, makeRemoteAuthentication } from "@/main/factories/usecases";
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
