import { type HttpPostClient } from '@/data/protocols/http';
import type { AddAccount, AddAccountParams } from '@/domain/usecases';
import type { AccountModel } from '@/domain/models';

export class RemoteAddAccount implements AddAccount {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<AddAccountParams, AccountModel>
  ) { }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async add(params: AddAccountParams): Promise<AccountModel> {
    await this.httpPostClient.post({
      url: this.url,
    });

    return { accessToken: '' };
  }
}