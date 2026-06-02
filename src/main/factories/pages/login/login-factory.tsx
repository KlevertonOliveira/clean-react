import { RemoteAuthentication } from "@/data/usecases/authentication/remote-authentication";
import { AxiosHttpClient } from "@/infra/axios-http-client/axios-http-client";
import { LoginPage } from "@/presentation/pages";
import { ValidationComposite } from "@/validation/validators";
import { ValidationBuilder } from "@/validation/validators/builder/validation-builder";

export default function MakeLogin(): React.JSX.Element {
  const url = "http://fordevs.herokuapp.com/api/login";
  const axiosHttpClient = new AxiosHttpClient();
  const remoteAuthentication = new RemoteAuthentication(url, axiosHttpClient);

  const validationComposite = ValidationComposite.build([
    ...ValidationBuilder.field('email').required().email().build(),
    ...ValidationBuilder.field('password').required().min(8).build()
  ]);

  return (
    <LoginPage 
      authentication={remoteAuthentication}
      validation={validationComposite}
    />
  )
}
