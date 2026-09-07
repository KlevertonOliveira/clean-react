import { AccessDeniedError } from "@/domain/errors";
import {
  QueryCache,
  QueryClient,
} from '@tanstack/react-query';

import type { AuthEventEmitter } from "../auth/auth-event-emitter";

function handleAuthError(error: Error, authEventEmitter: AuthEventEmitter) {
  if (error instanceof AccessDeniedError) {
    authEventEmitter.emit({ type: "forbidden" });
  }
}

export function createQueryClient(authEventEmitter: AuthEventEmitter) {
  const onError = (error: Error) => handleAuthError(error, authEventEmitter);
  const queryCache = new QueryCache({ onError });

  return new QueryClient({
    queryCache,

    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
}