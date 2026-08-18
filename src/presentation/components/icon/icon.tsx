import { CheckIcon, QuestionMarkIcon } from "@phosphor-icons/react";
import { twMerge } from "tailwind-merge";

export enum IconName {
  questionMark = "questionMark",
  checkMark = "checkMark"
}

type Props = {
  iconName: IconName;
  className?: string;
};

export default function Icon({
  iconName,
  className
}: Props) {
  const size: number = 32;

  return (
    <div className={twMerge(className)}>
      {iconName === IconName.questionMark && <QuestionMarkIcon size={size} />}
      {iconName === IconName.checkMark && <CheckIcon size={size} />}
    </div>
  );
}