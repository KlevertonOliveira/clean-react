import type { JSX } from "react/jsx-runtime";

type Props = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input(props: Props): JSX.Element {
  return (
    <div className="flex items-center gap-4 w-full relative">
      <input {...props} />

      <Input.Status />
    </div>
  )
}

function Status(): JSX.Element {
  return (
    <span 
      className="absolute right-2 w-3 h-3 rounded-full bg-red-500 cursor-help" 
    />
  )
}

Input.Status = Status;