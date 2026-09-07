import { describe, expect, test, vi } from 'vitest';

import { createAuthEventEmitter } from './auth-event-emitter';

describe('AuthEventEmitter', () => {
  test("Should notify a listener when an event is emitted", () => {
    const emitter = createAuthEventEmitter();
    const listener = vi.fn();

    emitter.on(listener);
    emitter.emit({ type: "forbidden" });

    expect(listener).toHaveBeenCalledWith({ type: "forbidden" });
  });

  test("Should stop notifying a listener after unsubscribe", () => {
    const emitter = createAuthEventEmitter();
    const listener = vi.fn();

    const unsubscribe = emitter.on(listener);
    unsubscribe();

    emitter.emit({ type: "forbidden" });

    expect(listener).not.toHaveBeenCalled();
  });
});