import { Input } from "../ui/input";
import { Label } from "../ui/label";

export function InputSettingField({
	label,
	onChange,
	value,
}: {
	label: string;
	value: number;
	onChange: (value: number) => void;
}) {
	return (
		<div className="relative">
			<Label className="absolute -top-1/8 left-2 px-2 bg-secondary font-semibold">{label}</Label>
			<Input
				value={value}
				onChange={(e) => onChange(Number(e.target.value))}
				className="px-4 py-5"
			/>
		</div>
	);
}
