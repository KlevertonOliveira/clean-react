import type { JSX } from "react/jsx-runtime";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  errorMessage?: string;
} ;

export default function Input({errorMessage, ...inputProps }: Props): JSX.Element {
  return (
    <div className="flex items-center gap-4 w-full relative">
      <input {...inputProps} data-testid={inputProps.name}/>

      <Input.Status 
        data-testid={`${inputProps.name}-status`}
        title={errorMessage}
      />
    </div>
  )
}

type StatusProps = React.HTMLAttributes<HTMLSpanElement>;

function Status(props: StatusProps): JSX.Element {
  return (
    <span
      {...props}
      className={`absolute right-2 w-3 h-3 rounded-full 
        ${ props.title ? 'cursor-help bg-red-500' : 'bg-green-500'}
      `}
    />
  )
}

Input.Status = Status;