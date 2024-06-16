import clsx from "clsx";
import { InputHTMLAttributes } from "react";

type RangeInputProps = {
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default function RangeInput({ className, ...rest }: RangeInputProps) {
  return (
    <input
      type="range"
      className={clsx(
        "h-1.5 bg-transparent border border-t-border accent-t-text",
        className
      )}
      {...rest}
    />
  );
}
