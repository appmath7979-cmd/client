import { Field, FieldDescription, FieldLabel } from "#/components/ui/field";
import { Input } from "#/components/ui/input";

interface CreateInputFieldProps {
	label: string;
	name: string;
	value: string;
	type?: "text" | "tel" | "password" | "email";
	onValueChange: (val: string) => void;
	errMsg: string;
	placeholder: string;
	description?: string;
	showDescription?: boolean;
}

export function CreateInputField({
	label,
	value,
	name,
	type,
	onValueChange,
	errMsg,
	placeholder,
	description,
	showDescription = false,
}: CreateInputFieldProps) {
	return (
		<Field>
			<FieldLabel htmlFor={name}>{label}</FieldLabel>
			<Input
				id={name}
				placeholder={placeholder}
				type={type}
				value={value}
				onChange={(e) => onValueChange(e.target.value)}
			/>
			{showDescription && <FieldDescription>{description}</FieldDescription>}
			<em className="text-xs font-semibold text-destructive">{errMsg}</em>
		</Field>
	);
}
