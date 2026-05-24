import { cn } from "#/lib/utils";
import type React from "react";

const variantButton = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/80",
  ghost: "",
  destructive:
    "bg-destructive text-destructive-foreground hover:bg-destructive/80",
};

const radiusButton = {
  small: "rounded-xl",
  half: "rounded-3xl",
  full: "rounded-full",
};

const sizeButton = {
  md: "h-10 px-4 [&_svg]:size-3.5",
  "icon-sm": "size-7",
};

interface ButtonProps {
  variant?: keyof typeof variantButton;
  radius?: keyof typeof radiusButton;
  size?: keyof typeof sizeButton;
}

export function Button({
  className,
  variant = "primary",
  radius = "small",
  size = "md",
  ...props
}: React.ComponentProps<"button"> & ButtonProps) {
  return (
    <button
      className={cn(
        "font-semibold inline-flex justify-center items-center gap-1 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:pointer-events-none",
        variantButton[variant],
        radiusButton[radius],
        sizeButton[size],
        className,
      )}
      {...props}
    />
  );
}
