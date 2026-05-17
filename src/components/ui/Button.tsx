import { cn } from "#/lib/utils";
import type { ButtonHTMLAttributes } from "react";

const variantButton = {
  primary:
    "bg-primary text-primary-foreground border-primary hover:bg-primary/80",
  secondary:
    "bg-secondary text-secondary-foreground border-secondary hover:bg-secondary/20",
  ghost:
    "border-transparent bg-transparent text-secondary-foreground hover:bg-accent/20 hover:text-accent-foreground",
  outline: "border-primary bg-transparent text-primary hover:bg-accent/20",
};

const sizeButton = {
  sm: "h-9 px-3 py-2 text-sm [&_svg]:size-4",
  md: "h-10 px-4 py-2 [&_svg]:size-5",
  lg: "h-11 px-4 py-2 [&_svg]:size-5",
  xl: "h-12 px-8 py-2 text-xl [&_svg]:size-5",
  "icon-sm": "size-9 [&_svg]:size-4",
  icon: "size-10 [&_svg]:size-4",
  "icon-lg": "size-11 [&_svg]:size-5",
};

const dangerButton = {
  primary:
    "bg-destructive text-destructive-foreground border-destructive hover:bg-destructive/80",
  secondary:
    "bg-secondary text-destructive border-secondary hover:bg-secondary/20",
  ghost:
    "border-transparent bg-transparent text-destructive hover:bg-secondary/20",
  outline:
    "border-destructive bg-background text-destructive hover:bg-secondary/20 hover:border-destructive",
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  className?: string;
  variant?: keyof typeof variantButton;
  size?: keyof typeof sizeButton;
  danger?: boolean;
}

export function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  danger = false,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex justify-center items-center gap-1 border-2 font-semibold rounded-md disabled:opacity-50 disabled:pointer-events-none transition-all duration-300 ease-in-out",
        variantButton[variant],
        sizeButton[size],
        danger && dangerButton[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
