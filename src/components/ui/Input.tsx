import { cn } from "#/lib/utils";
import type { InputHTMLAttributes } from "react";

interface InputProps {
  className?: string;
}

export function Input({
  className,
  ...props
}: InputProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn("transition-all duration-300 ease-in-out", className)}
      {...props}
    />
  );
}
