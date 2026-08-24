import { AxiosHttpClient } from "@/infra/axios-http-client/axios-http-client";

export const makeAxiosHttpClient = <
  Request = unknown,
  Response = unknown
>(): AxiosHttpClient<Request, Response> => {
  return new AxiosHttpClient<Request, Response>();
};