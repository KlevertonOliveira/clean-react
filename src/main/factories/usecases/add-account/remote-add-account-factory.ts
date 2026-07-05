import { makeApiURL } from "@/main/factories/http/api-url-factory";
import { makeAxiosHttpClient } from "@/main/factories/http/axios-http-client-factory";
import type { AddAccount } from "@/domain/usecases";
import { RemoteAddAccount } from "@/data/usecases/add-account/remote-add-account";

export const makeRemoteAddAccount = (): AddAccount => {
  return new RemoteAddAccount(makeApiURL("/signup"), makeAxiosHttpClient());
};