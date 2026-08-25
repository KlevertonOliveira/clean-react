import type { GetStorage, SetStorage } from "@/data/protocols/cache";

export class LocalStorageAdapter implements SetStorage, GetStorage {
  set(key: string, value: object): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  get(key: string): unknown {
    const storedValue = localStorage.getItem(key);

    if (!storedValue) return null;

    return JSON.parse(storedValue);
  }
}
