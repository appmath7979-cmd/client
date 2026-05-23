import { cn } from "#/lib/utils";
import type React from "react";

const variantButton = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/80",
  destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/80",
};

const radiusButton = {
  small: "rounded-xl",
  half: "rounded-3xl",
  full: "rounded-full",
};

interface ButtonProps {
  variant?: keyof typeof variantButton;
  radius?: keyof typeof radiusButton;
}

export function Button({
  className,
  variant = "primary",
  radius = "small",
  ...props
}: React.ComponentProps<"button"> & ButtonProps) {
  return (
    <button
      className={cn(
        "h-10 px-4 font-semibold inline-flex justify-center items-center gap-1 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:pointer-events-none",
        variantButton[variant],
        radiusButton[radius],
        className,
      )}
      {...props}
    />
  );
}
