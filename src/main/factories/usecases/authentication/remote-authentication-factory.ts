import { RemoteAuthentication } from "@/data/usecases/authentication/remote-authentication";
import type { Authentication } from "@/domain/usecases";
import { makeApiURL, makeAxiosHttpClient } from "../../http";

export const makeRemoteAuthentication = (): Authentication => {
  return new RemoteAuthentication(makeApiURL("/login"), makeAxiosHttpClient());
};