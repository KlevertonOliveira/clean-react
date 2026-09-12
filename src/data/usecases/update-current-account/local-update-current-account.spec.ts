import { LocalUpdateCurrentAccount } from "./local-update-current-account";
import { SetStorageMock } from "@/data/test";
import { UnexpectedError } from "@/domain/errors";
import { mockAccountModel } from "@/domain/test";

type SutTypes = {
  sut: LocalUpdateCurrentAccount;
  setStorageMock: SetStorageMock;
};

const makeSut = (): SutTypes => {
  const setStorageMock = new SetStorageMock();
  const sut = new LocalUpdateCurrentAccount(setStorageMock);

  return { sut, setStorageMock };
};

describe('LocalUpdateCurrentAccount', () => {
  test('Should call SetStorage with correct value', async () => {
    const { sut, setStorageMock } = makeSut();
    const account = mockAccountModel();

    await sut.save(account);

    expect(setStorageMock.key).toBe('account');
    expect(setStorageMock.value).toBe(account);
  });

  test('Should throw if SetStorage throws', async () => {
    const { sut, setStorageMock } = makeSut();
    vi.spyOn(setStorageMock, 'set').mockImplementation(() => { throw new Error(); });

    const promise = sut.save(mockAccountModel());
    await expect(promise).rejects.toThrow(new Error());
  });

  test('Should throw if accessToken is falsy', async () => {
    const { sut } = makeSut();
    // @ts-expect-error // Forcing "undefined" value, for a parameter that accepts only strings, to ensure it will not be accepted as a valid accessToken
    const promise = sut.save(undefined);
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
});