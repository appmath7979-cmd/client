import { cn } from "#/lib/utils";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";

interface InputBoxProps<T extends string | number> {
  name: string;
  label: string;
  value: string | number;
  type?: "string" | "number";
  placeholder?: string;
  errorContent?: string;
  onValueChange: (value: T) => void;
}

export const InputBox = <T extends string | number>({
  name,
  type = "string",
  label,
  value,
  placeholder,
  errorContent,
  onValueChange,
}: InputBoxProps<T>) => {
  return (
    <div className="w-full flex justify-between gap-3">
      <Label htmlFor={name}>{label}</Label>
      <div className="space-y-0.5 w-3/4">
        <Input
          id={name}
          type={type === "string" ? "text" : "number"}
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            const value =
              type === "string" ? e.target.value : Number(e.target.value);
            onValueChange(value as T);
          }}
          className="w-full"
        />
        <em
          className={cn(
            "font-semibold text-sm text-destructive opacity-0 invisible",
            !!errorContent && "opacity-100 visible",
          )}
        >
          {errorContent}
        </em>
      </div>
    </div>
  );
};
