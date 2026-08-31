import { setCurrentAccountAdapter } from "@/main/adapters/current-account-adapter";
import { routeAuth } from "./route-auth";

vi.mock("@/main/adapters/current-account-adapter", () => ({
  setCurrentAccountAdapter: vi.fn(),
}));

test("Should call setCurrentAccountAdapter with null when logout is called", () => {
  routeAuth.logout();

  expect(setCurrentAccountAdapter).toHaveBeenCalledTimes(1);
  expect(setCurrentAccountAdapter).toHaveBeenCalledWith(null);
});