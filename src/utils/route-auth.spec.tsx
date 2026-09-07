import { routeAuth } from "./route-auth";
import { mockAccountModel } from "@/domain/test";
import * as currentAccountAdapter from "@/main/adapters/current-account-adapter";

describe('RouteAuth', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe('isAuthenticated', () => {
    test("Should return false when no account information is stored", () => {
      const getSpy = (vi
        .spyOn(currentAccountAdapter, "getCurrentAccountAdapter")
      );

      const isAuthenticated = routeAuth.isAuthenticated();

      expect(getSpy).toHaveBeenCalledTimes(1);
      expect(isAuthenticated).toBeFalsy();
    });
  });

  describe('logout', () => {
    test("Should call setCurrentAccountAdapter with null when logout is called", () => {
      const setSpy = vi.spyOn(currentAccountAdapter, "setCurrentAccountAdapter");

      routeAuth.logout();

      expect(setSpy).toHaveBeenCalledTimes(1);
      expect(setSpy).toHaveBeenCalledWith(null);
    });
  });

  describe('getAccount', () => {
    test("Should get correct account information when getAccount is called", () => {
      const account = mockAccountModel();
      const getSpy = (vi
        .spyOn(currentAccountAdapter, "getCurrentAccountAdapter")
        .mockReturnValue(account)
      );

      const result = routeAuth.getAccount();

      expect(getSpy).toHaveBeenCalledTimes(1);
      expect(result).toEqual(account);
    });

    test("Should return null when no account value is stored", () => {
      const getSpy = vi.spyOn(currentAccountAdapter, "getCurrentAccountAdapter");

      const result = routeAuth.getAccount();

      expect(getSpy).toHaveBeenCalledTimes(1);
      expect(result).toBeNull();
    });
  });
});