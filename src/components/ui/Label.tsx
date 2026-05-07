import { cn } from "#/lib/utils";
import type { LabelHTMLAttributes } from "react";

interface LabelProps {
  className?: string;
  children: React.ReactNode;
}

export function Label({
  className,
  children,
  ...props
}: LabelProps & LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn(
        "font-semibold transition-all duration-300 ease-in-out",
        className,
      )}
      {...props}
    >
      {children}
    </label>
  );
}
