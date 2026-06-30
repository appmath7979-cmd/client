import { Field, FieldLabel } from "#/components/ui/field";
import { Input } from "#/components/ui/input";

interface InputFieldProps extends React.ComponentProps<"input"> {
	label: string;
	errorMsg: string;
}

export function InputField({ label, errorMsg, ...props }: InputFieldProps) {
	return (
		<Field>
			<FieldLabel>{label}</FieldLabel>
			<div className="w-full space-y-2">
				<Input {...props} className="w-full" />
				<em className="text-sm text-destructive">{errorMsg}</em>
			</div>
		</Field>
	);
}
