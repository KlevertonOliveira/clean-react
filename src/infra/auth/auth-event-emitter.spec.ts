import { describe, expect, it, vi } from 'vitest';

import { createAuthEventEmitter } from './auth-event-emitter';

describe('AuthEventEmitter', () => {
  it('notifies a listener when an event is emitted', () => {
    const emitter = createAuthEventEmitter();
    const listener = vi.fn();

    emitter.on(listener);
    emitter.emit({ type: "forbidden" });

    expect(listener).toHaveBeenCalledWith({ type: "forbidden" });
  });
});