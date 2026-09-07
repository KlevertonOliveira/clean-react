import { createAuthEventEmitter } from "@/infra/auth/auth-event-emitter";
import { setupAuthNavigation } from "@/presentation/router/auth-navigation/auth-navigation";
import type { AppRouter } from "@/presentation/router/router";

describe('AuthNavigation', () => {
  test('Should logout and navigate to /login when forbidden event is emitted', () => {
    const authEventEmitter = createAuthEventEmitter();

    const logoutMock = vi.fn();
    const navigateMock = vi.fn();

    const router = { navigate: navigateMock } as unknown as AppRouter;

    setupAuthNavigation({
      router,
      onLogout: logoutMock,
      authEventEmitter
    });
    authEventEmitter.emit({ type: "forbidden" });

    expect(logoutMock).toHaveBeenCalled();
    expect(navigateMock).toHaveBeenCalledWith({ to: "/login" });
  });

  test('Should not logout and navigate to /login after unsubscribe', () => {
    const authEventEmitter = createAuthEventEmitter();

    const logoutMock = vi.fn();
    const navigateMock = vi.fn();

    const router = { navigate: navigateMock } as unknown as AppRouter;

    const unsubscribe = setupAuthNavigation({
      router,
      onLogout: logoutMock,
      authEventEmitter
    });

    unsubscribe();

    authEventEmitter.emit({ type: "forbidden" });

    expect(logoutMock).not.toHaveBeenCalled();
    expect(navigateMock).not.toHaveBeenCalled();
  });
});