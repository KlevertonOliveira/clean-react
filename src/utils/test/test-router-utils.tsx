import {
  createMemoryHistory,
  createRootRoute,
  createRouter
} from "@tanstack/react-router";

import type { RouterContext } from "@/routes/__root";

type Params = {
  initialLocation: string;
  rootRoutecomponent: React.ReactElement;
  context?: RouterContext;
};

export function generateTestRouter({
  initialLocation,
  rootRoutecomponent,
  context,
}: Params): typeof router {
  const memoryHistory = createMemoryHistory({ initialEntries: [initialLocation] });
  const rootRoute = createRootRoute({ component: () => rootRoutecomponent });

  const router = createRouter({
    routeTree: rootRoute,
    history: memoryHistory,
    context
  });

  return router;
}