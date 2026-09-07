import { AccessDeniedError } from "@/domain/errors";
import {
  QueryCache,
  QueryClient,
} from '@tanstack/react-query';

import type { AuthEventEmitter } from "../auth/auth-event-emitter";

export function createQueryClient(authEventEmitter: AuthEventEmitter) {
  const queryCache = new QueryCache({
    onError: (error) => {
      if (error instanceof AccessDeniedError) {
        authEventEmitter.emit({ type: "forbidden" });
      }
    }
  });

  return new QueryClient({
    queryCache,

    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
}