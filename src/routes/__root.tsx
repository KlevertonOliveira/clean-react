/* eslint-disable */
import type { routeAuth } from "@/utils/route-auth";
import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

const RootLayout = () => (
  <>
    <Outlet />
    <TanStackRouterDevtools />
  </>
);

export type RouterContext = {
  routeAuth: typeof routeAuth;
  queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<RouterContext>()({ component: RootLayout });