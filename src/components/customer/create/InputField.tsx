import type { TextFieldProps } from "#/types/form.type";
import { Field, FieldLabel } from "../../ui/field";
import { Input } from "../../ui/input";

export function InputField({
	name,
	onChange,
	value,
	error,
	label,
	placeholder,
	type = "text",
}: TextFieldProps & { label: string; placeholder?: string; type?: string }) {
	return (
		<Field>
			<FieldLabel htmlFor={name}>{label}</FieldLabel>
			<Input
				id={name}
				type={type}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				placeholder={placeholder}
			/>
			<em className="text-sm text-destructive">{error}</em>
		</Field>
	);
}
