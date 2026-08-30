import type { HttpResponse } from "./http-response";

export type HttpGetParams = {
  url: string;
  headers?: any;
};

export interface HttpGetClient<ResponseBody> {
  get(params: HttpGetParams): Promise<HttpResponse<ResponseBody>>;
}
