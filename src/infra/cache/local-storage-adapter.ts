import type { GetStorage, SetStorage } from "@/data/protocols/cache";

export class LocalStorageAdapter implements SetStorage, GetStorage {
  set(key: string, value: unknown): void {
    if (!value) { localStorage.removeItem(key); }
    else { localStorage.setItem(key, JSON.stringify(value)); }
  }

  get(key: string): any {
    const storedValue = localStorage.getItem(key);

    if (!storedValue) return null;

    return JSON.parse(storedValue);
  }
}
