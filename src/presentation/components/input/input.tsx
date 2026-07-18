import { WarningIcon } from "@phosphor-icons/react";
import type { JSX } from "react/jsx-runtime";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  errorMessage?: string;
};

export default function Input({ errorMessage, ...inputProps }: Props): JSX.Element {
  return (
    <div className="flex items-center gap-4 w-full relative">
      <input
        {...inputProps}
        data-testid={inputProps.name}
        title={errorMessage}
        className={`w-full rounded-sm py-0 pr-10 pl-2 leading-10 border focus:outline-none focus:ring
          ${errorMessage
            ? "border-red-400 ring-red-400"
            : "border-green-400 ring-green-400"
          }
        `}
      />

      {errorMessage && (
        <Input.ErrorStatus
          data-testid={`${inputProps.name}-error-status`}
          title={errorMessage}
        />
      )}
    </div>
  );
}

type ErrorStatusProps = React.HTMLAttributes<HTMLSpanElement>;

function ErrorStatus(props: ErrorStatusProps): JSX.Element {
  return (
    <span
      {...props}
      className={`absolute right-2 cursor-help`}
    >
      <WarningIcon size={24} className="text-red-500" />
    </span>
  );
}

Input.ErrorStatus = ErrorStatus;