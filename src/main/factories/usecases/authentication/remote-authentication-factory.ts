import { makeApiURL } from "@/main/factories/http/api-url-factory";
import { makeAxiosHttpClient } from "@/main/factories/http/axios-http-client-factory";
import { RemoteAuthentication } from "@/data/usecases/authentication/remote-authentication";
import type { Authentication } from "@/domain/usecases";

export  const makeRemoteAuthentication = (): Authentication => {
  return new RemoteAuthentication(makeApiURL("/login"), makeAxiosHttpClient());
}