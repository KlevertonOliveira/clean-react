import { AccessDeniedError, UnexpectedError } from "@/domain/errors";
import { createAuthEventEmitter } from "../auth/auth-event-emitter";
import { createQueryClient } from "./query-client";

describe('QueryClient', () => {
  test('Should emit forbidden when a query fails with AccessDeniedError (403)', async () => {
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

  test('Should not emit an auth event for an unknown error (UnexpectedError)', async () => {
    const authEvents = createAuthEventEmitter();
    const listener = vi.fn();

    authEvents.on(listener);

    const queryClient = createQueryClient(authEvents);

    await expect(
      queryClient.query({
        queryKey: ['test'],
        queryFn: async () => { throw new UnexpectedError(); },
      }),
    ).rejects.toThrow();

    expect(listener).not.toHaveBeenCalled();
  });

  test('Should emit forbidden when a mutation fails with AccessDeniedError (403)', async () => {
    const authEvents = createAuthEventEmitter();
    const listener = vi.fn();

    authEvents.on(listener);

    const queryClient = createQueryClient(authEvents);

    const mutation = queryClient.getMutationCache().build(queryClient, {
      mutationFn: async () => { throw new AccessDeniedError(); }
    });

    await expect(mutation.execute(undefined)).rejects.toThrow();

    expect(listener).toHaveBeenCalledWith({ type: "forbidden" });
  });
});