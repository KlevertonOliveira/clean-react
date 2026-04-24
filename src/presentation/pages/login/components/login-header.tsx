import type { JSX } from "react/jsx-runtime";
import { memo } from "react";

import { Logo } from "@/presentation/components";

function LoginHeader(): JSX.Element {
  return (
    <header
      className="bg-primary border-t-40 border-solid border-primaryDark
      flex flex-col items-center"
    >
      <Logo />

      <h1 className="text-white mt-4 mb-10 mx-0">
        4Dev - Surveys for programmers
      </h1>
    </header>
  )
}

export default memo(LoginHeader);