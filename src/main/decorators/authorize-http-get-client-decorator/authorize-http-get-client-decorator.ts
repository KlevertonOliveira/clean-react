
import type { GetStorage } from "@/data/protocols/cache";
import type { HttpGetClient, HttpGetParams, HttpResponse } from "@/data/protocols/http";

export class AuthorizeHttpGetClientDecorator<Response> implements HttpGetClient<Response> {
  constructor(
    private readonly getStorage: GetStorage,
    private readonly httpGetClient: HttpGetClient<Response>
  ) { }

  async get(params: HttpGetParams): Promise<HttpResponse<Response>> {
    const account = this.getStorage.get("account");

    if (account?.accessToken) {
      params.headers = {
        ...params.headers,
        "x-access-token": account.accessToken
      };
    }

    const httpResponse = await this.httpGetClient.get(params);
    return httpResponse;
  }
}