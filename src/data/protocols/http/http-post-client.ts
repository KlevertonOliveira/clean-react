import type { HttpResponse } from '.';

export type HttpPostParams<RequestBody> = {
  url: string;
  body?: RequestBody;
};

export interface HttpPostClient<RequestBody, ResponseBody> {
  post(params: HttpPostParams<RequestBody>): Promise<HttpResponse<ResponseBody>>;
}