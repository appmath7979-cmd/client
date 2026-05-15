import { cn } from "#/lib/utils";
import { CheckIcon } from "@phosphor-icons/react";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";

interface InputToggleProps {
  value: boolean[];
  labels: string[];
  onValueChange: (value: boolean[]) => void;
}

export const InputToggle = ({
  value,
  labels,
  onValueChange,
}: InputToggleProps) => {
  return (
    <div className="flex items-center gap-4 mt-4">
      <Label
        className={cn(
          "w-1/2 border border-transparent rounded-md shadow-md p-4 bg-box text-center flex justify-center items-center gap-1 transition-smooth group",
          value[0] && "border-primary text-primary",
        )}
      >
        <Input
          type="radio"
          hidden
          checked={value[0]}
          onChange={() => onValueChange([!value[0], !value[1]])}
        />
        {value[0] && <CheckIcon size={16} weight="bold" />}
        <span className="transition-smooth group-hover:text-primary">
          {labels[0]}
        </span>
      </Label>
      <Label
        className={cn(
          "w-1/2 border border-transparent rounded-md shadow-md p-4 bg-box text-center flex justify-center items-center gap-1 transition-smooth group",
          value[1] && "border-primary text-primary",
        )}
      >
        <Input
          type="radio"
          hidden
          checked={value[1]}
          onChange={() => onValueChange([!value[0], !value[1]])}
        />
        {value[1] && <CheckIcon size={16} weight="bold" />}
        <span className="transition-smooth group-hover:text-primary">
          {labels[1]}
        </span>
      </Label>
    </div>
  );
};
