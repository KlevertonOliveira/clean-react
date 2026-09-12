import { RouterProvider } from '@tanstack/react-router';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { routeAuth } from "./utils/route-auth";
import { QueryClientProvider } from "@tanstack/react-query";
import { createAuthEventEmitter } from "./infra/auth/auth-event-emitter";
import { createQueryClient } from "./infra/query-client/query-client";
import { setupAuthNavigation } from "./presentation/router/auth-navigation/auth-navigation";
import { createAppRouter } from "./presentation/router/router";

const authEventEmitter = createAuthEventEmitter();
const queryClient = createQueryClient(authEventEmitter);
const router = createAppRouter();

// Register the router type for maximum type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

setupAuthNavigation({
  router,
  onLogout: routeAuth.logout,
  authEventEmitter
});

// Render the app
const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </StrictMode>,
  );
}