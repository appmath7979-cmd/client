import { Label } from "#/components/ui/label";
import { RadioGroup, RadioGroupItem } from "#/components/ui/radio-group";

interface RadioFieldProps {
	onValueChange: (val: boolean | "1_lan" | "ky_ruoi" | "nhieu_cap") => void;
	value: boolean | "1_lan" | "ky_ruoi" | "nhieu_cap";
	title: string;
	values: string[];
	name: string;
}

export function RadioField({
	onValueChange,
	title,
	value,
	values,
	name,
}: RadioFieldProps) {
	const setDefaultValue = () => {
		if (typeof value === "boolean") return value ? values[0] : values[1];
		else
			return value === "1_lan"
				? values[0]
				: value === "ky_ruoi"
					? values[1]
					: values[2];
	};

	const handleValueChange = (val: string) => {
		if (typeof value === "boolean") onValueChange(val === "Cho phép");
		else {
			const newValue =
				val === "1 lần" ? "1_lan" : val === "ky rưỡi" ? "ky_ruoi" : "nhieu_cap";
			onValueChange(newValue);
		}
	};

	return (
		<div className="space-y-4">
			<p className="font-semibold">{title}</p>
			<RadioGroup
				defaultValue={setDefaultValue()}
				onValueChange={(val) => handleValueChange(val)}
				className="flex items-center gap-6"
			>
				{values.map((item) => (
					<div key={`${name}-${item}`} className="flex items-center gap-3">
						<RadioGroupItem value={item} id={`${name}-${item}`} />
						<Label htmlFor={`${name}-${item}`}>{item}</Label>
					</div>
				))}
			</RadioGroup>
		</div>
	);
}
