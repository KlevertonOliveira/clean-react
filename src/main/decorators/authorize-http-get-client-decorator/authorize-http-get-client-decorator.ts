 
import type { GetStorage } from "@/data/protocols/cache";
import type { HttpGetClient, HttpGetParams } from "@/data/protocols/http";

export class AuthorizeHttpGetClientDecorator {
  constructor(
    private readonly getStorage: GetStorage,
    private readonly httpGetClient: HttpGetClient<unknown>
  ) { }

  async get(params: HttpGetParams): Promise<null> {
    this.getStorage.get("account");
    await this.httpGetClient.get(params);
    return null;
  }
}