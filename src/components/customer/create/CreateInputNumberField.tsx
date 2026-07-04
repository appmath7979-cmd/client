import {
	NumberField,
	NumberFieldGroup,
	NumberFieldInput,
	NumberFieldScrubArea,
} from "#/components/ui/number-field";

interface CreateInputNumberFieldProps {
	label: string;
	value: number;
	onValueChange: (val: number | null) => void;
}

export function CreateInputNumberField({
	label,
	value,
	onValueChange,
}: CreateInputNumberFieldProps) {
	return (
		<NumberField
			size="sm"
			format={{ style: "decimal" }}
			step={0.1}
			value={value === null ? 0 : value}
			min={0}
			onValueChange={(val) => onValueChange(val)}
		>
			<NumberFieldScrubArea label={label} />
			<NumberFieldGroup>
				<NumberFieldInput />
			</NumberFieldGroup>
		</NumberField>
	);
}
