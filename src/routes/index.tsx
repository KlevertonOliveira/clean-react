import { SurveyListPage } from "@/presentation/pages";
import { createFileRoute } from '@tanstack/react-router';
import type React from "react";

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent(): React.JSX.Element {
  return <SurveyListPage />;
}
