import type { AccountModel } from "@/domain/models";
import { makeLocalStorageAdapter } from "../factories/cache/local-storage-adapter-factory";

export const getCurrentAccountAdapter = (): AccountModel => {
  return makeLocalStorageAdapter().get("account");
};