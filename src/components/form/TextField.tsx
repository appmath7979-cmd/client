import type { InputHTMLAttributes } from "react";
import { Field, FieldDescription, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

export default function TextField({
	name,
	value,
	error,
	label,
	type,
	description,
	...props
}: {
	label: string;
	description?: string;
	error: string;
} & InputHTMLAttributes<HTMLInputElement>) {
	return (
		<Field className="-space-y-2">
			<div className="flex justify-between items-baseline-last">
				<FieldLabel htmlFor={name}>{label}</FieldLabel>
				<FieldDescription className="text-xs italic">
					{description}
				</FieldDescription>
			</div>
			<div>
				<Input {...props} />
				<em className="text-xs text-destructive">{error}</em>
			</div>
		</Field>
	);
}
