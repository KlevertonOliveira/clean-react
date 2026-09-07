import type { AuthEventEmitter } from "@/infra/auth/auth-event-emitter";
import type { AppRouter } from "../router";

type Params = {
  router: AppRouter;
  onLogout: () => void;
  authEventEmitter: AuthEventEmitter;
};

export function setupAuthNavigation({
  router,
  onLogout,
  authEventEmitter
}: Params) {
  return authEventEmitter.on(event => {
    if (event.type === "forbidden") {
      onLogout();
      void router.navigate({ to: "/login" });
    }
  });
}