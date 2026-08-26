import MakeLogin from "@/main/factories/pages/login/login-factory";
import { createFileRoute, redirect } from '@tanstack/react-router';

import '@/index.css';

export const Route = createFileRoute('/login')({
  beforeLoad: ({ context }) => {
    if (context.routeAuth.isAuthenticated()) {
      throw redirect({ to: "/" });
    }
  },
  component: MakeLogin,
});