import { cn } from "#/lib/utils";
import { RiLoader4Line } from "@remixicon/react";
import type React from "react";

export function Spinner({ className }: React.ComponentProps<"svg">) {
  return (
    <RiLoader4Line
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
    />
  );
}
