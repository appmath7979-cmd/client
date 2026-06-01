import type { TextFieldProps } from "#/types/form.type";
import { Field, FieldLabel } from "../../ui/field";
import { Input } from "../../ui/input";

export function UsernameField({
	name,
	value,
	onChange,
	error,
}: TextFieldProps) {
	return (
		<Field className="-space-y-2">
			<FieldLabel htmlFor={name}>Username</FieldLabel>
			<div>
				<Input
					id={name}
					type="text"
					placeholder="Username..."
					value={value}
					onChange={(e) => onChange(e.target.value)}
				/>
				<em className="text-xs text-destructive">{error}</em>
			</div>
		</Field>
	);
}
