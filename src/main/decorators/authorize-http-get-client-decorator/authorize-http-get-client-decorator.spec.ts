import { GetStorageSpy, mockGetRequest } from "@/data/test";

type SutTypes = {
  sut: AuthorizeHttpGetClientDecorator;
  getStorageSpy: GetStorageSpy;
};

const makeSut = (): SutTypes => {
  const getStorageSpy = new GetStorageSpy();

  const sut = new AuthorizeHttpGetClientDecorator(getStorageSpy);

  return {
    getStorageSpy,
    sut
  };
};

import { AuthorizeHttpGetClientDecorator } from "@/main/decorators";

describe('AuthorizeHttpGetClientDecorator', () => {
  test('Should call GetStorage with correct value', async () => {
    const { sut, getStorageSpy } = makeSut();

    await sut.get(mockGetRequest());

    expect(getStorageSpy.key).toBe("account");
  });
});