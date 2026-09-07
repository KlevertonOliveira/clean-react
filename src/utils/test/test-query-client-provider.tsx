import { createAuthEventEmitter } from "@/infra/auth/auth-event-emitter";
import { createQueryClient } from "@/infra/query-client/query-client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type Params = {
  children: React.ReactNode;
  queryClient?: QueryClient;
};

export default function TestQueryClientProvider({
  children,
  queryClient = createQueryClient(createAuthEventEmitter())
}: Params) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}