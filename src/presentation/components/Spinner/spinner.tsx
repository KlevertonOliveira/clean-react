import type { JSX } from "react/jsx-runtime";
import { SpinnerGapIcon } from "@phosphor-icons/react";

type SpinnerProps = {
  size?: number;
};

export function Spinner({ size = 24 }: SpinnerProps): JSX.Element {
  return (
    <SpinnerGapIcon
      className="animate-spin text-primaryLight" 
      size={size}
    />
  );
};
