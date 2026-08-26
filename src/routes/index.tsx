import { SurveyListPage } from "@/presentation/pages";
import { createFileRoute, redirect } from '@tanstack/react-router';
import type React from "react";

export const Route = createFileRoute('/')({
  beforeLoad: ({ context }) => {
    if (!context.routeAuth.isAuthenticated()) {
      throw redirect({ to: "/login" });
    }
  },
  component: RouteComponent,
});

function RouteComponent(): React.JSX.Element {
  return <SurveyListPage />;
}
