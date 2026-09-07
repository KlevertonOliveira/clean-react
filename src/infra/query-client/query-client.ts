import { AccessDeniedError } from "@/domain/errors";
import {
  MutationCache,
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
  const mutationCache = new MutationCache({ onError });

  return new QueryClient({
    queryCache,
    mutationCache,

    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
}