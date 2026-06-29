import type { AccountModel } from '@/domain/models';

export type AddAccountParams = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export interface AddAccount {
  add(params: AddAccountParams): Promise<AccountModel>;
}