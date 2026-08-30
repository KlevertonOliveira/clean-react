import { faker } from "@faker-js/faker";
import type { GetStorage, SetStorage } from "../protocols/cache";

export class SetStorageMock implements SetStorage {
  key!: string;
  value: unknown;

  set(key: string, value: unknown): void {
    this.key = key;
    this.value = value;
  }
}

export class GetStorageSpy implements GetStorage {
  key!: string;
  value: any = { data: faker.string.alphanumeric(8) };

  get(key: string): unknown {
    this.key = key;
    return this.value;
  }
}
