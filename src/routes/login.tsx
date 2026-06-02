import MakeLogin from "@/main/factories/pages/login/login-factory";
import { createFileRoute } from '@tanstack/react-router'

import '@/index.css';

export const Route = createFileRoute('/login')({
  component: MakeLogin,
})