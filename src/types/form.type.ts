interface TextFieldProps {
	name: string;
	value: string;
	onChange: (e: string) => void;
	error: string;
}

export type { TextFieldProps };
