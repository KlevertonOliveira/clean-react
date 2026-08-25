import { faker } from "@faker-js/faker";
import { LocalStorageAdapter } from "./local-storage-adapter";

const makeSut = (): LocalStorageAdapter => new LocalStorageAdapter();

describe('LocalStorageAdapter', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('Should call localStorage.setItem with correct values', () => {
    const sut = makeSut();
    const key = faker.database.column();
    const value = { data: faker.string.alphanumeric(6) };
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

    sut.set(key, value);

    expect(setItemSpy).toHaveBeenCalledWith(key, JSON.stringify(value));
  });

  test('Should call localStorage.getItem with correct value', () => {
    const sut = makeSut();
    const key = faker.database.column();
    const value = { data: faker.string.alphanumeric(6) };

    const getItemSpy = vi.spyOn(Storage.prototype, "getItem");
    getItemSpy.mockReturnValueOnce(JSON.stringify(value));

    const obj = sut.get(key);

    expect(getItemSpy).toHaveBeenCalledWith(key);
    expect(obj).toEqual(value);
  });
});