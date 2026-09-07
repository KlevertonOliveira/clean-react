import { AccessDeniedError } from "@/domain/errors";
import { createAuthEventEmitter } from "../auth/auth-event-emitter";
import { createQueryClient } from "./query-client";

describe('QueryClient', () => {
  test('emits forbidden when a query fails with AccessDeniedError (403)', async () => {
    const authEventEmitter = createAuthEventEmitter();
    const listener = vi.fn();

    authEventEmitter.on(listener);

    const queryClient = createQueryClient(authEventEmitter);

    await expect(
      queryClient.query({
        queryKey: ["test"],
        queryFn: async () => { throw new AccessDeniedError(); }
      })
    ).rejects.toThrow();

    expect(listener).toHaveBeenCalledWith({ type: "forbidden" });
  });
});