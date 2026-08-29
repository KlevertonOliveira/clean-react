import MakeSurveyListPage from "@/main/factories/pages/survey-list/survey-list-factory";
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  beforeLoad: ({ context }) => {
    if (!context.routeAuth.isAuthenticated()) {
      throw redirect({ to: "/login" });
    }
  },
  component: MakeSurveyListPage,
});
