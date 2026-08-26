import { createFileRoute, redirect } from '@tanstack/react-router';
import '@/index.css';
import MakeSignUp from "@/main/factories/pages/signup/signup-factory";

export const Route = createFileRoute('/signup')({
  beforeLoad: ({ context }) => {
    if (context.routeAuth.isAuthenticated()) {
      throw redirect({ to: "/" });
    }
  },
  component: MakeSignUp,
});