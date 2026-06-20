import type { SetStorage } from "@/data/protocols/cache/set-storage";

export class LocalStorageAdapter implements SetStorage {
  async set(key: string, value: unknown): Promise<void> {
    localStorage.setItem(key, String(value));
  }
}
