import { getCurrentAccountAdapter } from "@/main/adapters/current-account-adapter";

export const routeAuth = {
  isAuthenticated: () => Boolean(getCurrentAccountAdapter()?.accessToken)
};