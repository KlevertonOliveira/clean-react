
import type { GetStorage } from "@/data/protocols/cache";
import type { HttpGetClient, HttpGetParams } from "@/data/protocols/http";

export class AuthorizeHttpGetClientDecorator {
  constructor(
    private readonly getStorage: GetStorage,
    private readonly httpGetClient: HttpGetClient<unknown>
  ) { }

  async get(params: HttpGetParams): Promise<null> {
    const account = this.getStorage.get("account");

    if (account?.accessToken) {
      params.headers = {
        ...params.headers,
        "x-access-token": account.accessToken
      };
    }

    await this.httpGetClient.get(params);
    return null;
  }
}