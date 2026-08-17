import type { JSX } from "react/jsx-dev-runtime";
import logo4Dev from "@/presentation/assets/logo-4dev.svg";
import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
};

export default function Logo({ className }: Props): JSX.Element {
  return (
    <img
      className={twMerge(className)}
      src={logo4Dev}
      alt="Logo 4Dev"
    />
  );
}
