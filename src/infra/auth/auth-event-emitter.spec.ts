import { describe, expect, test, vi } from 'vitest';

import { createAuthEventEmitter, type AuthEvent } from './auth-event-emitter';

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

  test("Should notify all listeners registered", () => {
    const emitter = createAuthEventEmitter();

    const firstListener = vi.fn();
    const secondListener = vi.fn();

    emitter.on(firstListener);
    emitter.on(secondListener);

    const event: AuthEvent = { type: "forbidden" };
    emitter.emit(event);

    expect(firstListener).toHaveBeenCalledWith(event);
    expect(secondListener).toHaveBeenCalledWith(event);
  });

  test("Should keep listeners isolated between emitter instances", () => {
    const firstEmitter = createAuthEventEmitter();
    const firstListener = vi.fn();

    const secondEmitter = createAuthEventEmitter();
    const secondListener = vi.fn();

    firstEmitter.on(firstListener);
    secondEmitter.on(secondListener);

    firstEmitter.emit({ type: "forbidden" });

    expect(firstListener).toHaveBeenCalled();
    expect(secondListener).not.toHaveBeenCalled();
  });
});