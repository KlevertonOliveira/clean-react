import { createFileRoute } from '@tanstack/react-router';

import '@/index.css';
import { SignUpPage } from "@/presentation/pages";

export const Route = createFileRoute('/signup')({
  component: SignUpPage,
});