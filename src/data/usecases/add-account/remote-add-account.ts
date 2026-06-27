import { HttpStatusCode, type HttpPostClient } from '@/data/protocols/http';
import type { AddAccount, AddAccountParams } from '@/domain/usecases';
import type { AccountModel } from '@/domain/models';
import { EmailInUseError } from "@/domain/errors";

export class RemoteAddAccount implements AddAccount {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<AddAccountParams, AccountModel>
  ) { }

  async add(params: AddAccountParams): Promise<AccountModel> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.forbidden: throw new EmailInUseError();
      default: return { accessToken: '' };
    }
  }
}