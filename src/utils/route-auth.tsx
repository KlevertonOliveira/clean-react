import { getCurrentAccountAdapter, setCurrentAccountAdapter } from "@/main/adapters/current-account-adapter";

export const routeAuth = {
  isAuthenticated: () => Boolean(getCurrentAccountAdapter()?.accessToken),
  logout: () => setCurrentAccountAdapter(null)
};