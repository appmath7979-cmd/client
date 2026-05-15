import { cn } from "#/lib/utils";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";

interface RadioSelectProps {
  title: string;
  value: boolean[];
  labels: string[];
  onValueChange: (value: boolean[]) => void;
}

export const RadioSelect = ({
  title,
  value,
  labels,
  onValueChange,
}: RadioSelectProps) => {
  const handleSetValue = (current: number) => {
    const newValue = value.map((item, index) =>
      index === current ? (item = true) : false,
    );
    onValueChange(newValue);
  };
  return (
    <div className="space-y-2">
      <h2 className="font-semibold">{title}</h2>
      <div className="flex items-center gap-6">
        {labels.map((label, index) => (
          <Label
            key={label}
            className={cn(
              "flex items-center gap-1 group",
              value[index] && "text-primary",
            )}
          >
            <Input
              type="radio"
              hidden
              checked={value[index]}
              onChange={() => handleSetValue(index)}
            />
            <div
              className={cn(
                "relative size-4 border rounded-full transition-smooth group-hover:border-primary",
                value[index] && "border-primary [&_div]:bg-primary",
              )}
            >
              <div className="absolute top-1/2 left-1/2 -translate-1/2 size-2.5 rounded-full transition-smooth" />
            </div>
            <span
              className={cn(
                "transition-smooth group-hover:text-primary",
                value[index] && "text-primary",
              )}
            >
              {labels[index]}
            </span>
          </Label>
        ))}
      </div>
    </div>
  );
};
