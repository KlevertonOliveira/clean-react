import { faker } from "@faker-js/faker";
import { LocalStorageAdapter } from "./local-storage-adapter";

describe('LocalStorageAdapter', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('Should call localStorage with correct values', async () => {
    const sut = new LocalStorageAdapter();
    const key = faker.database.column();
    const value = faker.lorem.word();
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

    await sut.set(key, value);

    expect(setItemSpy).toHaveBeenCalledWith(key, String(value));
  });
});