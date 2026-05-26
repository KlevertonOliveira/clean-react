import { 
  createMemoryHistory, 
  createRootRoute, 
  createRouter 
} from "@tanstack/react-router";

type Params = {
  initialLocation: string;
  rootRoutecomponent: React.ReactElement;
}

export function generateTestRouter({ 
  initialLocation, 
  rootRoutecomponent
}: Params): typeof router {
  const memoryHistory = createMemoryHistory({ initialEntries: [initialLocation] });
  const rootRoute = createRootRoute({ component: () => rootRoutecomponent });

  const router = createRouter({
    routeTree: rootRoute,
    history: memoryHistory,
  });

  return router;
}