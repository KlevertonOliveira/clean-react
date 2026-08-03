import { AxiosHttpClient } from "@/infra/axios-http-client/axios-http-client";

export const makeAxiosHttpClient = (): AxiosHttpClient<unknown, unknown> => {
  return new AxiosHttpClient();
};