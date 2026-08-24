import type { SetStorage } from "@/data/protocols/cache/set-storage";

export class LocalStorageAdapter implements SetStorage {
  set(key: string, value: unknown): void {
    localStorage.setItem(key, String(value));
  }
}
