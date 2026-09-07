import { createRouter } from '@tanstack/react-router';
import { routeAuth } from "@/utils/route-auth";
import { routeTree } from "@/routeTree.gen";

export type AppRouter = ReturnType<typeof createAppRouter>;

export function createAppRouter() {
  return createRouter({
    routeTree,
    context: { routeAuth }
  });
}