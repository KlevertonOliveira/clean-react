import type { AddAccount } from "@/domain/usecases";
import { RemoteAddAccount } from "@/data/usecases/add-account/remote-add-account";
import { makeApiURL, makeAxiosHttpClient } from "../../http";

export const makeRemoteAddAccount = (): AddAccount => {
  return new RemoteAddAccount(makeApiURL("/signup"), makeAxiosHttpClient());
};