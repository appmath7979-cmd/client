import { cn } from "#/lib/utils";
import type React from "react";

export function Input({ className, ...props }: React.ComponentProps<"input">) {
  return <input className={cn("px-2 py-1 rounded-md border outline-0 ring ring-transparent transition-all duration-300 ease-in-out placeholder:font-medium focus:border-primary focus:ring-primary", className)} {...props} />;
}
