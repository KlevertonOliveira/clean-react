import { createFileRoute } from '@tanstack/react-router'

import '@/index.css';
import { SignupPage } from "@/presentation/pages/signup/signup";

export const Route = createFileRoute('/signup')({
  component: SignupPage,
})