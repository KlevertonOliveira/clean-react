import type { JSX } from "react/jsx-dev-runtime";
import logo4Dev from "@/presentation/assets/logo-4dev.svg";

export function Logo(): JSX.Element {
  return (
    <img className="mt-10" src={logo4Dev} alt="Logo 4Dev"/>
  )
}
