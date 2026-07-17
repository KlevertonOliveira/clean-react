import { LocalSaveAccessToken } from "./local-save-access-token";
import { SetStorageMock } from "@/data/test";
import { UnexpectedError } from "@/domain/errors";
import { faker } from '@faker-js/faker';

type SutTypes = {
  sut: LocalSaveAccessToken;
  setStorageMock: SetStorageMock;
};

const makeSut = (): SutTypes => {
  const setStorageMock = new SetStorageMock();
  const sut = new LocalSaveAccessToken(setStorageMock);

  return { sut, setStorageMock };
};

describe('LocalSaveAccessToken', () => {
  test('Should call SetStorage with correct value', async () => {
    const { sut, setStorageMock } = makeSut();
    const accessToken = faker.string.uuid();

    await sut.save(accessToken);

    expect(setStorageMock.key).toBe('accessToken');
    expect(setStorageMock.value).toBe(accessToken);
  });

  test('Should throw if SetStorage throws', async () => {
    const { sut, setStorageMock } = makeSut();
    vi.spyOn(setStorageMock, 'set').mockRejectedValueOnce(new Error());
    const accessToken = faker.string.uuid();

    const promise = sut.save(accessToken);
    await expect(promise).rejects.toThrow(new Error());
  });

  test('Should throw if accessToken is falsy', async () => {
    const { sut } = makeSut();
    // @ts-expect-error // Forcing "undefined" value, for a parameter that accepts only strings, to ensure it will not be accepted as a valid accessToken
    const promise = sut.save(undefined);
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
});