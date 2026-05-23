import type { InputHTMLAttributes } from "react";
import { Input } from "../Input";
import { Label } from "../Label";
import { cn } from "#/lib/utils";

interface TextFieldProps {
  id: string;
  errorContent: string;
  label: string;
}

export default function TextField({
  id,
  label,
  className,
  errorContent,
  ...props
}: TextFieldProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div
      className={cn("flex max-sm:flex-col sm:items-center sm:gap-4", className)}
    >
      <Label htmlFor={id} className="w-25">
        {label}
      </Label>
      <div className="w-full">
        <Input id={id} {...props} className="block w-full" />
        <em className="text-sm">{errorContent}</em>
      </div>
    </div>
  );
}
