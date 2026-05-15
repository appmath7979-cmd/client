import { Input } from "../ui/Input";
import { Label } from "../ui/Label";

interface InputBox2Props {
  label: string;
  value: number;
  onValueChange: (value: number) => void;
}

export function InputBox2({ label, value, onValueChange }: InputBox2Props) {
  return (
    <div className="relative w-1/2">
      <Label className="absolute -top-1/2 left-2 z-10 px-1 bg-box text-sm">
        {label}
      </Label>
      <Input
        type="number"
        step="any"
        value={value}
        onChange={(e) => onValueChange(Number(e.target.value))}
        className="ps-3 w-full"
      />
    </div>
  );
}
