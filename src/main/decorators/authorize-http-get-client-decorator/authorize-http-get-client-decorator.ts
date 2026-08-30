/* eslint-disable @typescript-eslint/no-unused-vars */
import type { GetStorage } from "@/data/protocols/cache";
import type { HttpGetParams } from "@/data/protocols/http";

export class AuthorizeHttpGetClientDecorator {
  constructor(private readonly getStorage: GetStorage) { }

  async get(_params: HttpGetParams): Promise<null> {
    this.getStorage.get("account");
    return null;
  }
}