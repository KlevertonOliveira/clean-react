import { LoginPage } from "@/presentation/pages";
import { makeRemoteAuthentication } from "@/main/factories/usecases/authentication/remote-authentication-factory";
import { makeLocalSaveAccessToken } from "@/main/factories/usecases/save-access-token/save-access-token-factory";
import { makeLoginValidation } from "./login-validation-factory";

export default function MakeLogin(): React.JSX.Element {
  return (
    <LoginPage
      authentication={makeRemoteAuthentication()}
      validation={makeLoginValidation()}
      saveAccessToken={makeLocalSaveAccessToken()}
    />
  );
}
