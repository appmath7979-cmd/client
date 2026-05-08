import { cn } from "#/lib/utils";
import type { InputHTMLAttributes } from "react";

interface InputProps {
  className?: string;
  danger?: boolean;
}

export function Input({
  className,
  danger = false,
  ...props
}: InputProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "border outline ring rounded-md px-2 py-1 transition-all duration-300 ease-in-out focus:border-primary focus:outline-primary focus:ring-primary",
        danger && "border-destructive outline-deborder-destructive ring-deborder-destructive",
        className,
      )}
      {...props}
    />
  );
}
