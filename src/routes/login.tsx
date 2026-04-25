import { createFileRoute } from '@tanstack/react-router'
import { LoginPage } from "@/presentation/pages";

import '@/index.css';

export const Route = createFileRoute('/login')({
  component: LoginPage,
})