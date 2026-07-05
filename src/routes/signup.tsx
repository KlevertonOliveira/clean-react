import { createFileRoute } from '@tanstack/react-router';
import '@/index.css';
import MakeSignUp from "@/main/factories/pages/signup/signup-factory";

export const Route = createFileRoute('/signup')({
  component: MakeSignUp,
});