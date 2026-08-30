
import type { GetStorage } from "@/data/protocols/cache";
import type { HttpGetClient, HttpGetParams, HttpResponse } from "@/data/protocols/http";

export class AuthorizeHttpGetClientDecorator implements HttpGetClient<unknown> {
  constructor(
    private readonly getStorage: GetStorage,
    private readonly httpGetClient: HttpGetClient<unknown>
  ) { }

  async get(params: HttpGetParams): Promise<HttpResponse<unknown>> {
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