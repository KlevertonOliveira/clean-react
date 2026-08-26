import { mockAccountModel } from "@/domain/test";
import { LocalStorageAdapter } from "@/infra/cache/local-storage-adapter";
import { getCurrentAccountAdapter } from "./current-account-adapter";

describe("CurrentAccountAdapter", () => {
  test("Should call LocalStorageAdapter.get with correct values", () => {
    const mockedAccount = mockAccountModel();

    const getSpy = vi.spyOn(LocalStorageAdapter.prototype, "get");
    getSpy.mockReturnValueOnce(mockedAccount);

    const result = getCurrentAccountAdapter();

    expect(getSpy).toHaveBeenCalledWith("account");
    expect(result).toBe(mockedAccount);
  });
});