export type AuthEvent =
  | { type: 'forbidden'; };

export type AuthEventListener = (event: AuthEvent) => void;

export function createAuthEventEmitter() {
  const listeners = new Set<AuthEventListener>();

  function on(listener: AuthEventListener) {
    listeners.add(listener);

    return () => {
      listeners.delete(listener);
    };
  };

  function emit(event: AuthEvent) {
    for (const listener of listeners) {
      listener(event);
    }
  }

  return {
    on,
    emit
  };
}

export type AuthEventEmitter = ReturnType<typeof createAuthEventEmitter>;