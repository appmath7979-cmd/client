import { Label } from "#/components/ui/label";
import { Radio, RadioGroup } from "#/components/ui/radio-group";
import type { CreateToggleListType } from "#/types/create-customer.type";

interface CreateRadioFieldProps {
	title?: string;
	name: string;
	values: CreateToggleListType;
	defaultValue: string;
	onValueChange: (val: string) => void;
}

export function CreateRadioField({
	title,
	name,
	values,
	onValueChange,
	defaultValue,
}: CreateRadioFieldProps) {
	if (values.length <= 1) return null;

	return (
		<div className="space-y-1">
			{title && <h3 className="font-semibold">{title}</h3>}
			<RadioGroup
				defaultValue={defaultValue}
				className={"p-4 border rounded-md flex-row w-fit"}
				onValueChange={(val: string) => onValueChange(val)}
			>
				{values.map((value) => {
					return (
						<Label key={`${name}-${value.value}`}>
							<Radio value={value.value} /> {value.label}
						</Label>
					);
				})}
			</RadioGroup>
		</div>
	);
}
