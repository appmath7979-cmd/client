import { RadioGroup } from "#/components/ui/radio-group";

interface CreateRadioFieldProps {
	values: string[];
	value: string;
	onValueChange: () => void;
}

export function CreateRadioField() {
	return <RadioGroup></RadioGroup>;
}
